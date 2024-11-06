import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/context/AuthContext";
import DropUpButton from "@/components/DropUpButton";

const VerifiedHome = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f2f2f2]">
      <GestureHandlerRootView>
        <ScrollView contentContainerClassName={{ height: "100%" }}>
          <View className="border w-full justify-center items-center min-h-[100vh] p-4">
            <View className="border justify-center items-center bg-white p-6 rounded-xl shadow-md w-3/4 ">
              <Text className="text-xl font-bold mb-3">
                Welcome to the App!
              </Text>
              <Text className="text-base text-center text-gray-600">
                This is the home page for verified users.
              </Text>
            </View>
            <View className="absolute bottom-5 right-1 w-full px-4 my-6">
              <DropUpButton />
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const UnverifiedHome = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f2f2f2] justify-center items-center">
      <ScrollView>
        <GestureHandlerRootView>
          <View className="bg-white p-6 rounded-xl shadow-md">
            <Text className="text-xl font-bold mb-3">
              Oops, you're not verified yet!
            </Text>
            <Text className="text-base text-gray-600">
              Please contact the admin to get your account verified.
            </Text>
          </View>
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaView>
  );
};

const Home = () => {
  const { isVerified } = useAuth();

  return isVerified ? <VerifiedHome /> : <UnverifiedHome />;
};

export default Home;
