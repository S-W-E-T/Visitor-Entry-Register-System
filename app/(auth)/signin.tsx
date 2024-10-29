import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import FormFeild from "@/components/FormFeild";
import CustomButton from "@/components/CustomButton";
import { images } from "../../constants";
import { useLogin } from "@/hooks/authHooks/useLogin";
import { LoginData } from "@/types/user_types";

const SignIn = () => {
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const { loginUser, loading, error } = useLogin();

  const handleLogin = async () => {
    console.log("form in handle login", form);
    const success = await loginUser(form);
    if (success) {
      router.push("/home");
    } else {
      Alert.alert("Login Failed", error || "Please check your credentials");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <GestureHandlerRootView>
        <ScrollView>
          <View className="w-full min-h-[85vh] justify-center px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[200px] h-[85px]"
            />
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
              Log in to Vers
            </Text>

            <FormFeild
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormFeild
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Sign In"
              containerStyle="mt-7"
              handlePress={handleLogin}
              isLoading={loading}
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-pregular text-gray-100">
                Don't have an account?
              </Text>
              <Link
                href="/signup"
                className="text-secondary font-psemibold text-lg"
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default SignIn;
