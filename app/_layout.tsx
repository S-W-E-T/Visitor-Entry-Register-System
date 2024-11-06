import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";

const _layout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="Collapsible" options={{headerShown:false}}/> */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(newEntry)" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name='/Search/[query]' options={{headerShown:false}}/> */}
      </Stack>
      <Toast />
      {/* <Slot /> */}
    </AuthProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
