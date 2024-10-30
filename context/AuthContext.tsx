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
import {
  SERVICE_NAME_FOR_USER_STORAGE,
  SERVICE_NAME_FOR_TOKEN_STORAGE,
  SERVICE_NAME_FOR_ROLE_STORAGE,
  SERVICE_NAME_FOR_ISVERIFIED_STORAGE,
} from "@/constant/expoStore";
import { set } from "mongoose";
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
  role: string | null;
  isVerified: boolean | null;
  isLoading: boolean;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
}
// Helper function to set secure store value with null handling and string conversion
const setSecureStoreValue = async (
  key: string,
  value: string | null
): Promise<void> => {
  console.log("key is-", key, "value is-", value);
  try {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      // Convert to string if not already
      await SecureStore.setItemAsync(key, JSON.stringify(value), {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
    }
  } catch (error) {
    console.error(`Error setting secure store for key ${key}:`, error);
    throw error;
  }
};

// Helper function to get values from secure store
const getFromSecureStore = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error retrieving from secure store for key ${key}:`, error);
    return null;
  }
};

// Helper function to remove secure store value
const removeSecureStoreValue = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error removing secure store for key ${key}:`, error);
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  role: null,
  isVerified: null,
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
  const [role, setRole] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const loadDetailsFromSecureStore = async () => {
      try {
        const [storedToken, storedUser, storedRole, storedIsVerified] =
          await Promise.all([
            getFromSecureStore(SERVICE_NAME_FOR_TOKEN_STORAGE),
            getFromSecureStore(SERVICE_NAME_FOR_USER_STORAGE),
            getFromSecureStore(SERVICE_NAME_FOR_ROLE_STORAGE),
            getFromSecureStore(SERVICE_NAME_FOR_ISVERIFIED_STORAGE),
          ]);

        setToken(storedToken);
        setUser(storedUser ? JSON.parse(storedUser) : null);
        setRole(storedRole);
        setIsVerified(storedIsVerified === "true");
      } catch (error) {
        console.error("Error loading auth Details:", error);
        await signOut();
      } finally {
        setIsLoading(false);
      }
    };
    loadDetailsFromSecureStore();
  }, []);

  const signIn = async (token: string, user: User) => {
    try {
      setRole(user.role);
      setIsVerified(user.accessApproved);
      setToken(token);
      setUser(user);
      await Promise.all([
        setSecureStoreValue(SERVICE_NAME_FOR_TOKEN_STORAGE, token),
        setSecureStoreValue(
          SERVICE_NAME_FOR_USER_STORAGE,
          JSON.stringify(user)
        ),
        setSecureStoreValue(SERVICE_NAME_FOR_ROLE_STORAGE, user.role),
        setSecureStoreValue(
          SERVICE_NAME_FOR_ISVERIFIED_STORAGE,
          user.accessApproved.toString()
        ),
      ]);
      router.replace("/home");
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  const signOut = async () => {
    try {
      setToken(null);
      setUser(null);
      setRole(null);
      setIsVerified(null);
      await Promise.all([
        removeSecureStoreValue(SERVICE_NAME_FOR_TOKEN_STORAGE),
        removeSecureStoreValue(SERVICE_NAME_FOR_USER_STORAGE),
        removeSecureStoreValue(SERVICE_NAME_FOR_ROLE_STORAGE),
        removeSecureStoreValue(SERVICE_NAME_FOR_ISVERIFIED_STORAGE),
      ]);
      router.replace("/");
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role, isVerified, isLoading, signIn, signOut }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
