import { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
// import { useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.apiUrl || "https://vers-backend.onrender.com";

interface CreatePostData {
  name: string;
  purpose: string;
  inTime: string; // ISO 8601 timestamp
  location: string;
  outTime?: string; // ISO 8601 timestamp
  description?: string;
}

interface CreatePostResult {
  loading: boolean;
  createPost: (details: CreatePostData) => Promise<boolean>;
}

const useCreatePost = (onSuccess?: () => void): CreatePostResult => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const createPost = async (details: CreatePostData): Promise<boolean> => {
    setLoading(true);
    const toastId = Toast.show({
      type: "info",
      text1: "Creating post...",
      position: "top",
    });
    try {
      const response = await axios.post(`${API_URL}/api/v1/entries/`, details, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Toast.hide(toastId);
        Toast.show({
          type: "success",
          text1: "Post created successfully",
          position: "top",
        });
        if (onSuccess && typeof onSuccess === "function") {
          onSuccess();
        }
        return true;
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as Error).message ||
        "An error occurred while creating the post";
      Toast.hide(toastId);
      Toast.show({
        type: "error",
        text1: "Failed to create post",
        text2: errorMessage,
        position: "top",
      });
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createPost };
};

export default useCreatePost;
