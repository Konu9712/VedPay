import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import SplashScreen from "./Pages/SplashScreen/SplashScreen";
import GettingStartedScreen from "./Pages/GettingStarted/GettingStartedScreen";
import Logo from "./Components/Logo/Logo";
import OtpScreen from "./Pages/OtpScreen/OtpScreen";
import PreQrScreen from "./Pages/PreQrScreen/PreQrScreen";
import QRScanner from "./Pages/QRScanner/QRScanner";
import CardCollectionScreen from "./Pages/CardCollectionScreen/CardCollectionScreen";
import AddCardScreen from "./Pages/AddCardScreen/AddCardScreen";
import Modal from "./Components/Modal/Modal";
import CardTransactionListScreen from "./Pages/CardTransactionListScreen/CardTransactionListScreen";
import AddMoneyMainScreen from "./Pages/AddMoneyMainScreen/AddMoneyMainScreen";
import AddMoneySource from "./Pages/AddMoneySource/AddMoneySource";
import AddMoneySuccessfully from "./Pages/AddMoneySuccessfully/AddMoneySuccessfully";
import HistoryMainScreen from "./Pages/HistoryMainScreen/HistoryMainScreen";
import HistoryDetails from "./Pages/HistoryDetails/HistoryDetails";

const d = Dimensions.get("window");
export default function App() {
  return (
    <ImageBackground
      style={styles.app}
      source={require("./assets/background.png")}
      imageStyle={{ resizeMode: "repeat" }}
    >
      {/* <SplashScreen /> */}
      {/* <GettingStartedScreen /> */}
      {/* <OtpScreen /> */}
      {/* <PreQrScreen /> */}
      {/* <QRScanner /> */}
      {/* <CardCollectionScreen /> */}
      {/* <AddCardScreen /> */}
      {/* <Modal /> */}
      {/* <CardTransactionListScreen /> */}
      {/* <AddMoneyMainScreen /> */}
      {/* <AddMoneySource /> */}
      {/* <AddMoneySuccessfully /> */}
      {/* <HistoryMainScreen /> */}
      <HistoryDetails />
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
