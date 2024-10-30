import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import Icons from "react-native-vector-icons/Ionicons";
import Iconsplus from "react-native-vector-icons/AntDesign";
import { useAuth } from "@/context/AuthContext";

const TabIcon = ({ icons, color, name, focused, size }) => {
  return (
    <View className="flex flex-col items-center justify-center w-full gap-2">
      <Image
        source={icons}
        tintColor={color}
        resizeMode="contain"
        className={size}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { isVerified } = useAuth();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopColor: "#232533",
            borderTopWidth: 1,
            height: 74,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.home}
                color={color}
                name="Home"
                focused={focused}
                size="w-6 h-6"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmarks",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.bookmark}
                color={isVerified ? color : "#CDCDE0"}
                name="Bookmarks"
                focused={focused && isVerified}
                size="w-6 h-6"
              />
            ),
            tabBarItemStyle: {
              pointerEvents: isVerified ? "auto" : "none",
            },
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="flex flex-col items-center justify-center mb-4 ml-1 w-full ">
                <Iconsplus
                  name="pluscircle"
                  size={60}
                  color={isVerified && focused ? "#FFA001" : "#d3d3d3"}
                />
                <Text
                  className={`${
                    focused && isVerified ? "font-psemibold" : "font-pregular"
                  } text-lg mt-1`}
                  style={{ color: isVerified ? color : "#CDCDE0" }}
                >
                  New Entry
                </Text>
              </View>
            ),
            tabBarItemStyle: {
              pointerEvents: isVerified ? "auto" : "none",
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.profile}
                color={isVerified ? color : "#CDCDE0"}
                name="Profile"
                focused={focused && isVerified}
                size="w-6 h-6"
              />
            ),
            tabBarItemStyle: {
              pointerEvents: isVerified ? "auto" : "none",
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "account",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.profile}
                color={color}
                name="Account"
                focused={focused}
                size="w-6 h-6"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
