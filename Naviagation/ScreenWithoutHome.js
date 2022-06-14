import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import LogIn from "../Pages/LogIn/LogIn";
import OtpScreen from "../Pages/OtpScreen/OtpScreen";
import PreQrScreen from "../Pages/PreQrScreen/PreQrScreen";
import Qr_Scanner from "../Pages/QRScanner/QRScanner";
import SignUp from "../Pages/SignUp/SignUp";
import SplashScreen from "../Pages/SplashScreen/SplashScreen";

export default function ScreenWithoutHome() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none" initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="PreQrScreen" component={PreQrScreen} />
      <Stack.Screen name="Qr_Scanner" component={Qr_Scanner} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  app: {},
});
