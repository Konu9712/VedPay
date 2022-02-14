import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const imageUrl = "https://www.bespokematrimony.in/resources/images/rupay.png";

export default function RupayCardLogo() {
  return (
    <>
   <Image source={{uri: imageUrl}}  style={styles.logo}  />   
    </>
  );
}

const styles = StyleSheet.create({
logo:{
    height: hp('5%'), 
    width: wp('30%'),
    marginLeft:wp("3%")
}
});
