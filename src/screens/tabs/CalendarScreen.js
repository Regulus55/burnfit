import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants";

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Calendar screen</Text>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
});
