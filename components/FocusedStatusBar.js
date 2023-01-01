import { useIsFocused } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import React from "react";

const FocusedStatusBar = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar animated={true} {...props} />
  ) : (
    <Text>sdfsdf</Text>
  );
};

export default FocusedStatusBar;
