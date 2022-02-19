import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground,Dimensions } from 'react-native';
import Constants from 'expo-constants';
import SplashScreen from './Pages/SplashScreen/SplashScreen'
import GettingStartedScreen from './Pages/GettingStarted/GettingStartedScreen';
import Logo from './Components/Logo/Logo';
import OtpScreen from './Pages/OtpScreen/OtpScreen';
import PreQrScreen from './Pages/PreQrScreen/PreQrScreen';
import QRScanner from './Pages/QRScanner/QRScanner';
import CardCollectionScreen from './Pages/CardCollectionScreen/CardCollectionScreen';
import NewCarCollection from './Pages/NewCarCollection/NewCarCollection';



const d = Dimensions.get("window")
export default function App() {

  return (
    <ImageBackground style = {styles.app} source={require("./assets/background.png")} imageStyle={{resizeMode: 'repeat'}} >
    {/* <SplashScreen/> */}
    {/* <GettingStartedScreen/> */}
    {/* <OtpScreen/> */}
    {/* <PreQrScreen/> */}
    {/* <QRScanner/> */}
    <CardCollectionScreen/>
    {/* <NewCarCollection/> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  app:{
    flex:1,
    width: d.width,
    height: d.height,
    backgroundColor:"#3a245b",
  }
});