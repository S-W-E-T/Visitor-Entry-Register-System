import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
  Keyboard,
  TextInput,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/context/AuthContext";
import DropUpButton from "@/components/DropUpButton";
import { Feather } from "@expo/vector-icons";
import useFetchPosts from "@/hooks/postHooks/useFetchPosts";
import EntryDetails from "@/components/EntryDetails";
const VerifiedHome = () => {
  const { posts, loading, refetchPosts } = useFetchPosts();
  // posts has the posts data fetched from the server here
  console.log("posts for home page",posts)
  const {role} = useAuth();
  console.log(role);

  return (
    <SafeAreaView className="flex-1 bg-[#f2f2f2]">
      <GestureHandlerRootView>
        <ScrollView contentContainerClassName={{ height: "100%" }}>
          {role==="ADMIN"?<></>: <View className="absolute bottom-12 right-1 w-full px-4 my-8 z-50">
              <DropUpButton />
            </View>}
          <View className="border w-full justify-top items-center min-h-[100vh] mt-10">
            <View className="w-full pt-5">
              <Text className="font-pbold pl-4 mb-3">Entry Details</Text>

              <View className="flex-1 p-4 bg-white h-[86vh]">
                <EntryDetails/>
              </View>
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
