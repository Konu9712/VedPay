import * as React from "react";
import { StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Provider } from "react-redux";
import Naviagation from "./Naviagation/Naviagation";
import store from "./store/store";

const d = Dimensions.get("window");
export default function App() {
  return (
    <ImageBackground
      style={styles.app}
      source={require("./assets/background.png")}
      imageStyle={{ resizeMode: "repeat" }}
    >
      <Provider store={store}>
        <Naviagation />
      </Provider>
    </ImageBackground>
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
