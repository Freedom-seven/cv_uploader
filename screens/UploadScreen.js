import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AnimatedButton from "../components/Button";
import Colors from "../constants/Colors";
import { PORTAL_API_BASE_URL, PORTAL_API_SUCCESS_URL } from "../utils/api";

const UploadScreen = ({ navigation }) => {
  // Don't forget to receive navigation prop
  const [portalUrl, setPortalUrl] = useState(null); // State to hold the portal URL
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [uploadSuccess, setUploadSuccess] = useState(false); // State to handle upload success

  // Fetch the portal URL when the component mounts
  useEffect(() => {
    const fetchPortalUrl = async () => {
      let accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      try {
        let response = await axios.get(`${PORTAL_API_BASE_URL}/PortalUrl`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        let url = response.data;
        setPortalUrl(url);
      } catch (error) {
        console.error("Error fetching portal URL:", error);
      }
      setLoading(false); // Set loading to false after fetching the URL
    };

    fetchPortalUrl();
  }, []);

  // Handle navigation state changes in the WebView
  const handleNavigationStateChange = (navState) => {
    if (navState.url === `${PORTAL_API_SUCCESS_URL}/PortalSuccess`) {
      setUploadSuccess(true);
    }
  };

  // Render loading indicator while fetching the portal URL
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render the WebView or success message
  return (
    <View style={styles.container}>
      {uploadSuccess ? (
        <View style={styles.successContainer}>
          <Image
            source={require("../assets/success.gif")} // path to the gif
            style={styles.gif}
            resizeMode="contain" // to maintain the aspect ratio
          />
          <Text style={styles.successText}>
            🎉 Your CV has been successfully uploaded! 🎉
          </Text>

          <AnimatedButton
            title="Go to Home"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      ) : portalUrl ? (
        <WebView
          source={{ uri: portalUrl }}
          startInLoadingState={true}
          onNavigationStateChange={handleNavigationStateChange}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          style={styles.webview}
        />
      ) : (
        <Text style={styles.errorText}>No portal URL available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  webview: {
    flex: 1,
    width: "100%",
    marginTop: 25,
    borderRadius: 10,
    overflow: "hidden",
  },
  errorText: {
    fontSize: 16,
    color: Colors.WARNING_COLOR,
    textAlign: "center",
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    width: 200,
    height: 200,
  },
  successText: {
    fontSize: 20,
    color: Colors.SUCCESS_COLOR,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default UploadScreen;
