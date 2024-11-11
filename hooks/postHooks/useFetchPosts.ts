import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.apiUrl || "https://vers-backend.onrender.com";

interface Post {
  _id: string;
  name: string;
  purpose: string;
  inTime: string;
  outTime: string | null;
  userId: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface FetchPostsResult {
  posts: Post[];
  loading: boolean;
  refetchPosts: () => void;
}

const useFetchPosts = (): FetchPostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const toastId = Toast.show({
      type: "info",
      text1: "Fetching posts...",
      position: "top",
    });
    try {
      const response = await axios.get(`${API_URL}/api/v1/entries/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Toast.hide(toastId);
        Toast.show({
          type: "success",
          text1: "Posts loaded successfully",
          position: "top",
        });
        setPosts(response.data);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as Error).message ||
        "An error occurred while fetching posts";
      Toast.hide(toastId);
      Toast.show({
        type: "error",
        text1: "Failed to fetch posts",
        text2: errorMessage,
        position: "top",
      });
      console.error(error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, refetchPosts: fetchPosts };
};

export default useFetchPosts;
