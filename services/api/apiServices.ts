import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const apiUrl =
  Constants.expoConfig?.extra?.apiUrl || "https://vers-backend.onrender.com";

const apiService = axios.create({
  baseURL: apiUrl,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(async (config: any) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error fetching auth token:", error);
  }
  return config;
});

export default apiService;
