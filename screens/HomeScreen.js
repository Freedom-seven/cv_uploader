// screens/HomeScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/Card";

// Defining the HomeScreen component
// This component receives navigation props from React Navigation
// The Card component is rendered with navigation props as a prop to access them inside of Card
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});

export default HomeScreen;
