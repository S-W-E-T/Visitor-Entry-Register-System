import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.apiUrl || "https://vers-backend.onrender.com";

interface AccessRequest {
  _id: string;
  userId: {
    _id: string;
    name: string;
    phoneNumber: string;
    email: string;
  };
  role: string;
  accessApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FetchAccessRequestsResult {
  accessRequests: AccessRequest[];
  loading: boolean;
  refetchAccessRequests: () => void;
}

const useFetchAccessRequests = (): FetchAccessRequestsResult => {
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchAccessRequests = useCallback(async () => {
    setLoading(true);
    const toastId = Toast.show({
      type: "info",
      text1: "Fetching access requests...",
      position: "top",
    });
    try {
      const response = await axios.get(`${API_URL}/api/v1/access/approve`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Toast.hide(toastId);
        Toast.show({
          type: "success",
          text1: "Access requests loaded successfully",
          position: "top",
        });
        setAccessRequests(response.data);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      Toast.hide(toastId);
      Toast.show({
        type: "error",
        text1: errorMessage,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAccessRequests();
  }, [fetchAccessRequests]);

  return {
    accessRequests,
    loading,
    refetchAccessRequests: fetchAccessRequests,
  };
};

export default useFetchAccessRequests;
