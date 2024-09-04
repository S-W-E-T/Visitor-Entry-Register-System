import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

import {
  SignUpData,
  UseSignupResult,
  SignUpResponse,
} from "@/types/user_types";

const API_URL =
  Constants.expoConfig?.extra?.apiUrl || "https://vers-backend.onrender.com";

export const useSignup = (): UseSignupResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpUser = async (data: SignUpData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post<SignUpResponse>(
        `${API_URL}/api/v1/auth/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response data", res.data);

      if (res.status === 201) {
        const { token, user } = res.data;

        // Store auth token and active user
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("activeUser", JSON.stringify(user));

        // Show success toast
        Toast.show({
          type: "success",
          text1: "Sign up successful",
          text2: "Welcome to the app!",
        });

        // Navigate to home screen
        router.replace("/home");

        return true;
      }
      return false;
    } catch (err) {
      const errorMessage =
        (err as Error)?.response?.data?.error ||
        (err as Error).message ||
        "Sign up failed";
      console.log(err);
      setError(errorMessage);

      // Show error toast
      Toast.show({
        type: "error",
        text1: "Sign up failed",
        text2: errorMessage,
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, signUpUser };
};
