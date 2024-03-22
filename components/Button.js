// Importing necessary modules from react and react-native
import React, { useRef } from "react";
import { Animated, StyleSheet, Text, Pressable } from "react-native";
import Colors from "../constants/Colors"; // Importing the Colors constants

// Defining the AnimatedButton component
// This component receives onPress and title props
export default function AnimatedButton({ onPress, title }) {
  // Initializing a new Animated Value with useRef hook
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Defining the handlePressIn function for the Pressable
  const handlePressIn = () => {
    // Starting the spring animation when the button is pressed
    Animated.spring(scaleValue, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  // Defining the handlePressOut function for the Pressable
  const handlePressOut = () => {
    // Reversing the spring animation when the button is released
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Defining the animated styles for the button
  const animatedStyles = {
    transform: [{ scale: scaleValue }],
  };

  // Rendering the AnimatedButton component
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.button, animatedStyles]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
