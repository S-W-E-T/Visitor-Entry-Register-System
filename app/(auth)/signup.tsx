import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { images } from "../../constants";
import FormFeild from "@/components/FormFeild";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import SelectButton from "@/components/SelectButton";
import { useSignup } from "@/hooks/authHooks/useSignup";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
  });

  const { signUpUser, loading, error } = useSignup();

  const handleSignup = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.role ||
      !form.phoneNumber
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    try {
      console.log(form);
      await signUpUser(form);
    } catch (err) {
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setForm((prev) => ({ ...prev, role: selectedRole }));
  };

  const options = ["Admin", "Guard"];

  return (
    <SafeAreaView className="bg-primary h-full">
      <GestureHandlerRootView>
        <ScrollView>
          <View className="w-full min-h-[100vh] justify-center px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[200px] h-[85px]"
            />
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
              Register to Vers
            </Text>

            <FormFeild
              title="Username"
              value={form.name}
              handleChangeText={(text) =>
                setForm((prev) => ({ ...prev, name: text }))
              }
              otherStyles="mt-7"
              onLoading={loading}
            />
            <FormFeild
              title="Email"
              value={form.email}
              handleChangeText={(text) =>
                setForm((prev) => ({ ...prev, email: text }))
              }
              otherStyles="mt-7"
              keyboardType="email-address"
              onLoading={loading}
            />
            <FormFeild
              title="Password"
              value={form.password}
              handleChangeText={(text) =>
                setForm((prev) => ({ ...prev, password: text }))
              }
              otherStyles="mt-7"
              secureTextEntry
              onLoading={loading}
            />
            <FormFeild
              title="Phone Number"
              value={form.phoneNumber}
              handleChangeText={(text) =>
                setForm((prev) => ({ ...prev, phoneNumber: text }))
              }
              otherStyles="mt-7"
              keyboardType="phone-pad"
              onLoading={loading}
            />
            <SelectButton
              title="Select your Role"
              containerStyle="mt-7"
              options={options}
              optionStyle="bg-secondary"
              value={
                form.role === "ADMIN"
                  ? "Admin"
                  : form.role === "USER"
                  ? "Guard"
                  : ""
              }
              onSelect={handleRoleSelect}
              onLoading={loading}
            />
            <CustomButton
              title="Sign Up"
              containerStyle="mt-7"
              handlePress={handleSignup}
              isLoading={loading}
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-pregular text-gray-100">
                Already have an account?
              </Text>
              <Link
                href="/signin"
                className="text-secondary font-psemibold text-lg"
              >
                SignIn
              </Link>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Signup;
