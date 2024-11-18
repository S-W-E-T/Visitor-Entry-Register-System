import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import Icons from "react-native-vector-icons/Ionicons";
import Iconsplus from "react-native-vector-icons/AntDesign";
import { useAuth } from "@/context/AuthContext";
import AccessControl from "./accessControl";

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
  const { isVerified, role } = useAuth();
  
  const renderBookmarkTab = () => {
    if (role === 'ADMIN') {
      return (
        <Tabs.Screen
          name="access-control"
          options={{
            title: "AccessControl",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.bookmark}
                color={isVerified ? color : "#CDCDE0"}
                name="AccessControl"
                focused={focused && isVerified}
                size="w-7 h-7"
              />
            ),
            tabBarItemStyle: {
              paddingTop: 12,
              pointerEvents: isVerified ? "auto" : "none",
            },
          }}
        />
      );
    }

    return (
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
              size="w-7 h-7"
            />
          ),
          tabBarItemStyle: {
            paddingTop: 12,
            pointerEvents: isVerified ? "auto" : "none",
          },
        }}
      />
    );
  };

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
            height: 74, // Increased height for better touch targets
            paddingHorizontal: 16, // Add horizontal padding
            paddingBottom: 20, // Add bottom padding for better reachability
            paddingTop: 12, // Add top padding
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position: 'absolute', // Ensure it stays at bottom
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 8, // Add shadow for Android
            shadowColor: '#000', // Shadow for iOS
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
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
                size="w-7 h-7" // Slightly larger icons
              />
            ),
            tabBarItemStyle: {
              paddingTop: 12, // Add padding to individual tabs
            }
          }}
        />
        {renderBookmarkTab()}
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
                size="w-7 h-7"
              />
            ),
            tabBarItemStyle: {
              paddingTop: 12,
              pointerEvents: isVerified ? "auto" : "none",
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icons={icons.profile}
                color={color}
                name="Account"
                focused={focused}
                size="w-7 h-7"
              />
            ),
            tabBarItemStyle: {
              paddingTop: 12,
            }
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
