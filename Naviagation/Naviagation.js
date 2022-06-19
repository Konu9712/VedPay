import React, { useState } from "react";
import { ImageBackground, StyleSheet, Dimensions } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import TabNavigation from "./TabNavigation";
import ScreenWithoutHome from "./ScreenWithoutHome";
import { useSelector } from "react-redux";

const d = Dimensions.get("window");

export default function Naviagation() {
  const authSelector = useSelector((state) => state.auth);
  const { token } = authSelector;
  const [qr, setQR] = useState(false);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <ImageBackground
        style={styles.app}
        source={require("../assets/background.png")}
        imageStyle={{ resizeMode: "repeat" }}
      >
        {token && qr ? <TabNavigation /> : <ScreenWithoutHome />}
      </ImageBackground>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  app: {
    flex: 1,
    width: d.width,
    height: d.height,
    backgroundColor: "#3a245b",
  },
});
