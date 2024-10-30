import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { Feather, Ionicons } from "@expo/vector-icons";

const AccountPage = () => {
  const { user, isVerified, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {/* Account Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.infoItem}>
          <Feather name="user" size={24} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{user?.name || "N/A"}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="mail" size={24} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user?.email || "N/A"}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          {isVerified ? (
            <>
              <Feather name="briefcase" size={24} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Role:</Text>
                <Text style={styles.infoValue}>{user?.role || "N/A"}</Text>
              </View>
            </>
          ) : (
            <>
              <Ionicons name="alert-circle-outline" size={24} color="#ff3b30" />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: "#ff3b30" }]}>
                  Your role {user?.role} is not verified.
                </Text>
                <Text style={styles.infoValue}>
                  Please contact the admin to get your role verified.
                </Text>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  section: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
