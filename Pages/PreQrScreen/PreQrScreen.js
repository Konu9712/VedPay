import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import { Button } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Logo from '../../Components/Logo/Logo';





export default function PreQrScreen() {
  return (
    <View style={styles.container}>

        <View style={styles.welcome_text_container}>
            <Text style={styles.welcome_text}>Welcome To</Text>
            <Text style={styles.to_text}>To</Text>
        </View>
        
        <View style={styles.logo_container}>
          <Logo style={styles.logo}/>
      </View>

      <View style={styles.info_container}>
        <Text style={styles.desc_1}>Please provide your biometric To To</Text>
        <Text style={styles.desc_1}>Nearest merchant site site</Text>
      </View>
      
      <View style={styles.scanner_container}>
        <Text style={styles.desc_2}>
            If you Already have you Qr Code Code
        </Text>

        <Button mode="contained" 
               style={styles.qr_btn}  
               onPress={() => console.log("QR Scanner")}
               color='green'>
                  Scan QR
      </Button>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      width:wp('100%'),
      height:hp('100%'),
  },
  welcome_text_container:{
    justifyContent:'center',
    marginTop:hp("20%"),
    flexDirection:'row',
  },
  welcome_text:{
      color:'white',
      fontWeight:"bold",
      fontSize: hp('9%'),
  },
  to_text:{
    color:'#92d050',
    fontWeight:"bold",
    fontSize: hp('9%'),
    marginLeft:wp('-10%')
  },
  logo_container:{
    alignItems:'center',
    marginTop:hp("5%")
  },
  info_container:{
    alignItems:'center',
    marginTop:hp("5%"),
  },
  desc_1:{
      color:'#92d050',
      fontWeight:"bold",
      fontSize: hp('3%'),
  },
  img_container:{
    alignItems:'center',
  },
  demo_pic:{
    height: hp('10%'), 
    width: wp('40%'),
  },
  scanner_container:{
    alignItems:'center',
  },
  desc_2:{
    fontWeight:"bold",
    fontSize: hp('3%'),
    color:'#ffff'
  },
  qr_btn:{
      marginTop:hp('2%')
  }
});
