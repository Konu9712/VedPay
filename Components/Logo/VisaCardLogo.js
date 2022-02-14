import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const imageUrl = "https://www.lebanonfcu.org/wp-content/uploads/2016/12/visa-logo.png";

export default function VisaCardLogo() {
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
