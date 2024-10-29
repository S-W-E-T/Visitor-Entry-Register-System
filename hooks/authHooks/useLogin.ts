import { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { LoginData, UseLoginResult, LoginResponse } from "@/types/user_types";

const API_URL =
  Constants.expoConfig?.extra?.apiUrl || "https://vers-backend.onrender.com";

export const useLogin = (): UseLoginResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();

  const loginUser = async (data: LoginData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      console.log("data", data);
      const res = await axios.post<LoginResponse>(
        `${API_URL}/api/v1/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response data", res.data);

      if (res.status === 200) {
        const { token, user } = res.data;
        console.log("token", token);
        console.log("user", user);
        await signIn(token, user);

        // Show success toast
        Toast.show({
          type: "success",
          text1: "Login successful",
          text2: `Welcome back, ${user.name}!`,
        });

        // Navigate to home screen
        // router.replace("/home");

        return true;
      }
      return false;
    } catch (err) {
      const errorMessage =
        (err as any)?.response?.data?.message ||
        (err as Error).message ||
        "Login failed";
      console.log(err);
      setError(errorMessage);

      // Show error toast
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: errorMessage,
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, loginUser };
};
