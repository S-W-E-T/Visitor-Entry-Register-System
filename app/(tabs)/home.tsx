import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

const home = () => {
  const { user } = useAuth();
  return (
    <SafeAreaView>
      {/* You must start your coding after this */}
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default home;
