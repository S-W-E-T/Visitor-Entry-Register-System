import { useState } from "react";
import { signUp } from "@/services/api/auth_api";
import { SignUpData, UseSignupResult } from "@/types/user_types";

export const useSignup = (): UseSignupResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpUser = async (data: SignUpData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await signUp(data);
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, signUpUser };
};
