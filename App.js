import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import SplashScreen from './Pages/SplashScreen/SplashScreen'
import GettingStartedScreen from './Pages/GettingStarted/GettingStartedScreen';
import Logo from './Components/Logo/Logo';




export default function App() {
  return (
    <View style={styles.container}>
    {/* <SplashScreen/> */}
    <GettingStartedScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
    // padding: 8,
  },
});
