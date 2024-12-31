import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants";

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Library screen</Text>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
});
