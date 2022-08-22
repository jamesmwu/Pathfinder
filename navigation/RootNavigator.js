import { View, Text, StyleSheet } from "react-native";
import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";

const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <Text>what's poppin</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RootNavigator;
