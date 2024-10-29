import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/AuthContext"; // Adjust the path accordingly

const AuthLayout = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // User is logged in, navigate to home
        router.replace("/home");
      }
    }
  }, [user, isLoading, router]);

  return (
    <>
      <Stack>
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
