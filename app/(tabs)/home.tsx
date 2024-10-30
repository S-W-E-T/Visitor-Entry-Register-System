import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

const VerifiedHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to the App!</Text>
        <Text style={styles.description}>
          This is the home page for verified users.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const UnverifiedHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Oops, you're not verified yet!</Text>
        <Text style={styles.description}>
          Please contact the admin to get your account verified.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const Home = () => {
  const { isVerified } = useAuth();

  return isVerified ? <VerifiedHome /> : <UnverifiedHome />;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});
