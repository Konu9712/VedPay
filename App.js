import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
// import Constants from "expo-constants";
// import SplashScreen from "./Pages/SplashScreen/SplashScreen";
// import GettingStartedScreen from "./Pages/GettingStarted/GettingStartedScreen";
// import Logo from "./Components/Logo/Logo";
// import OtpScreen from "./Pages/OtpScreen/OtpScreen";
// import PreQrScreen from "./Pages/PreQrScreen/PreQrScreen";
// import QRScanner from "./Pages/QRScanner/QRScanner";
// import CardCollectionScreen from "./Pages/Card/CardCollectionScreen/CardCollectionScreen";
// import AddCardScreen from "./Pages/Card/AddCardScreen/AddCardScreen";
// import Modal from "./Components/Modal/Modal";
// import CardTransactionListScreen from "./Pages/Card/CardTransactionListScreen/CardTransactionListScreen";
// import AddMoneyMainScreen from "./Pages/In/AddMoneyMainScreen/AddMoneyMainScreen";
// import AddMoneySource from "./Pages/In/AddMoneySource/AddMoneySource";
// import AddMoneySuccessfully from "./Pages/AddMoneySuccessfully/AddMoneySuccessfully";
// import HistoryMainScreen from "./Pages/HistoryMainScreen/HistoryMainScreen";
// import HistoryDetails from "./Pages/History/HistoryDetails/HistoryDetails";
// import OutMainScreen from "./Pages/Out/OutMainScreen/OutMainScreen";
// import OutContactChatScreen from "./Pages/OutContactChatScreen/OutContactChatScreen";
// import OutPayScreen from "./Pages/Out/OutPayScreen/OutPayScreen";
import Naviagation from "./Naviagation/Naviagation";

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
      {/* Card Collection ---------------------- */}
      {/* <CardCollectionScreen /> */}
      {/* <AddCardScreen /> */}
      {/* <Modal /> */}
      {/* <CardTransactionListScreen /> */}
      {/* IN------------------------------------ */}
      {/* <AddMoneyMainScreen /> */}
      {/* <AddMoneySource /> */}
      {/* <AddMoneySuccessfully /> */}
      {/* History-------------------------------- */}
      {/* <HistoryMainScreen /> */}
      {/* <HistoryDetails /> */}
      {/* OUT------------------------------------ */}
      {/* <OutMainScreen /> */}
      {/* <OutContactChatScreen /> */}
      {/* <OutPayScreen /> */}
      <Naviagation />
    </ImageBackground>

    // <Naviagation />
    // <>
    //   <Text>HEllo</Text>
    // </>
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
