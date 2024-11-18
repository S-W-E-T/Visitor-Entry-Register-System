import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.apiUrl || "https://vers-backend.onrender.com";

interface ApproveRequest {
  accessId: string;
  role: string;
}
interface ApproveAccessRequestResult {
  loading: boolean;
  approveAccessRequest: (details: ApproveRequest) => Promise<boolean>;
}

const useApproveAccessRequest = (
  onSuccess?: () => void
): ApproveAccessRequestResult => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const approveAccessRequest = async (
    details: ApproveRequest
  ): Promise<boolean> => {
    setLoading(true);
    const toastId = Toast.show({
      type: "info",
      text1: "Approving access request...",
      position: "top",
    });
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/access/approve`,
        details,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Toast.hide(toastId);
        Toast.show({
          type: "success",
          text1: "Access request approved successfully",
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
        (error as any)?.message ||
        "Failed to approve access request";
      console.log("error", error);
      Toast.hide(toastId);
      Toast.show({
        type: "error",
        text1: errorMessage,
        position: "top",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, approveAccessRequest };
};

export default useApproveAccessRequest;
