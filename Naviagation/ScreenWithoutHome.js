import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import LogIn from "../Pages/LogIn/LogIn";
import PreQrScreen from "../Pages/PreQrScreen/PreQrScreen";
import Qr_Scanner from "../Pages/QRScanner/QRScanner";
import SignUp from "../Pages/SignUp/SignUp";
import SplashScreen from "../Pages/SplashScreen/SplashScreen";

export default function ScreenWithoutHome() {
  const authSelector = useSelector((state) => state.auth);
  const { token } = authSelector;
  // Condition in Stack navigator
  const Stack = createStackNavigator();

  const AuthStack = useCallback(() => {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LogIn" component={LogIn} />
      </Stack.Navigator>
    );
  }, []);

  const QrStack = useCallback(() => {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="PreQrScreen">
        <Stack.Screen name="PreQrScreen" component={PreQrScreen} />
        <Stack.Screen name="Qr_Scanner" component={Qr_Scanner} />
      </Stack.Navigator>
    );
  }, []);
  return <>{!token ? <AuthStack /> : <QrStack />}</>;
}

const styles = StyleSheet.create({
  app: {},
});
