// Importing necessary modules from react and react-native
import React from "react";
import { StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import Colors from "../constants/Colors"; // Importing the Colors constants

// Defining the Card component
// This component receives navigation props
const Card = ({ navigation }) => {
  const scaleValue = new Animated.Value(0); // Initializing a new Animated Value

  // Interpolating the scale value for the card animation
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1.2],
  });

  // Defining the transform style for the card
  let transformStyle = { ...styles.card, transform: [{ scale: cardScale }] };

  // Defining the onPressIn function for the TouchableOpacity
  const onPressIn = () => {
    // Starting the animation when the button is pressed
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // Defining the onPressOut function for the TouchableOpacity
  const onPressOut = () => {
    // Reversing the animation when the button is released
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    // Navigate to UploadScreen
    navigation.navigate("Upload");
  };

  // Rendering the Card component
  return (
    <Animated.View style={transformStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.button}
      >
        <Text style={styles.text}>Press to upload your CV</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default Card;
