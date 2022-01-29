import * as React from 'react';
import { Text, View, StyleSheet,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button  } from 'react-native-paper';

export default function SplashScreen() {
  return (
 <View>

    <View style={styles.header_wrapper}>
      <Image source = {require('../../assets/icon_png.png')} style={styles.header}  />   
    </View>

    <View style={styles.text_wrapper}>
    <Text style={styles.text_header}>Keep your all cards in One place </Text>
    <Text style={styles.desc_1}>Make every payments with the</Text>
    <Text style={styles.desc_2}>safest way possible</Text>
    </View>

    <View style={styles.btn_wrapper}>
    <Button mode="contained" style={styles.btn_getStarted} onPress={() => console.log('Pressed')} color='green'>
    Get Started
    </Button>   

    <Button mode="outlined" style={styles.btn_lonIn} onPress={() => console.log('Pressed')}  color='green'>
    LogIn
    </Button>   
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '',
    // padding: 8,
  },
  header:{
   height: hp('5%'), 
   width: wp('30%'),
   marginTop: hp("20"),
   marginLeft:wp("35")
  },
  text_wrapper:{
    marginTop:hp('15'),
    marginLeft:wp('20')
  },
  text_header:{
    fontSize: hp('2.5%'),
    fontWeight: 'bold'
  },
  desc_1:{
    fontSize:hp('2.4%'),
    marginTop:wp("1%")
  },
  desc_2:{
    fontSize:hp("2.4%"),
    marginLeft:wp("10%")
  },
  btn_wrapper:{
    marginTop:hp("25%"),
    marginLeft:wp("10%"),
    marginRight:wp("10%")  
  },
  btn_getStarted:{
  },
  btn_lonIn:{
    marginTop:hp('2%')
  }

  
});
