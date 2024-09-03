import apiService from "./apiServices";

import { SignUpData, SignUpResponse } from "@/types/user_types";

export const signUp = async (data: SignUpData): Promise<SignUpResponse> => {
  try {
    const response = await apiService.post<SignUpResponse>("/signup", data);
    console.log("User signed up successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error signing up:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to sign up");
  }
};
