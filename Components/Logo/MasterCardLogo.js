import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const imageUrl = "http://logok.org/wp-content/uploads/2014/03/Mastercard-logo-2016.png";

export default function MasterCardLogo() {
  return (
    <>
   <Image source={{uri: imageUrl}}  style={styles.logo}  />   
    </>
  );
}

const styles = StyleSheet.create({
logo:{
    height: hp('5%'), 
    width: wp('20%'),
}
});
