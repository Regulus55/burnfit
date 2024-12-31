import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants";

const MypageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My page screen</Text>
    </View>
  );
};

export default MypageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
});
