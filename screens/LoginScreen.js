// Import necessary modules
import React from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as Yup from "yup";
import AnimatedButton from "../components/Button";
import Colors from "../constants/Colors";
import { LOGIN_API_URL } from "../utils/api";

// Define validation schema for the login form
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

// Define LoginScreen component
export default function LoginScreen({ navigation }) {
  // Define function to handle login
  const handleLogin = async (values) => {
    try {
      // Make a POST request to the login API
      const response = await axios.post(`${LOGIN_API_URL}/Login`, values);
      // Extract the access token from the response
      const accessToken = response.data.accessToken;
      // Save the access token for future API requests
      await AsyncStorage.setItem("accessToken", accessToken);
      // Navigate to the Home screen
      navigation.navigate("Home");
    } catch (error) {
      // Display an error message if the login fails
      Alert.alert("Error", error.message);
    }
  };

  // Render the login form
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        // Use Animatable.View for a nice animation effect
        <Animatable.View animation="fadeInUpBig" style={styles.container}>
          <Text style={styles.title}>Welcome Back</Text>

          {/* Display error message if email is invalid or empty */}
          {errors.email && touched.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
          {/* Text input for email */}
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="Email"
            style={styles.input}
          />

          {/* Display error message if password is invalid, too short, too long, or empty */}
          {errors.password && touched.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          {/* Text input for password */}
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />

          {/* Animated button for form submission */}
          <AnimatedButton onPress={handleSubmit} title="Login" />
        </Animatable.View>
      )}
    </Formik>
  );
}

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: Colors.TEXT_COLOR,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.SECONDARY_COLOR,
  },
  errorText: {
    color: Colors.ERROR_COLOR,
    marginBottom: 10,
  },
});
