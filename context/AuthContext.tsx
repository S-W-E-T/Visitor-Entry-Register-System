import {
  useState,
  useEffect,
  useContext,
  createContext,
  type PropsWithChildren,
} from "react";
import * as SecureStore from "expo-secure-store";
import { isTokenValid } from "@/utils/jwt";
import { router } from "expo-router";

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  accessApproved: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  signIn: () => {},
  signOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load session from SecureStore on initial load
    const loadSession = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("sessionToken");
        const storedUser = await SecureStore.getItemAsync("sessionUser");

        if (storedToken && isTokenValid(storedToken) && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired or not available, clear storage
          await SecureStore.deleteItemAsync("sessionToken");
          await SecureStore.deleteItemAsync("sessionUser");
        }
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const signIn = async (token: string, user: User) => {
    try {
      await SecureStore.setItemAsync("sessionToken", token);
      await SecureStore.setItemAsync("sessionUser", JSON.stringify(user));
      setToken(token);
      setUser(user);
      router.replace("/home");
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync("sessionToken");
      await SecureStore.deleteItemAsync("sessionUser");
      setToken(null);
      setUser(null);
      router.replace("/");
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
