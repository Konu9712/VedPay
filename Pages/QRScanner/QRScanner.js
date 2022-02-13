import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Logo from '../../Components/Logo/Logo';




export default function Qr_Scanner({route}) {

  const [hasPermission,setHasPermission] = useState(null)
  const [scanned,setScanned] = useState(false)
  const [text,settext] = useState('Not yet Scanned')
  const [code,setCode] = useState('');


  const submit = async (props) =>{
    
    }


// Camera permission
  const askForCammeraPermission = () => {
    (async ()=>{
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  //Request Camera
  useEffect(()=>{  
    askForCammeraPermission();
  },[])

  //After scan the barcode
  const handleBarCodeScanned = ({type, data}) =>{
    settext(data);
    setCode(data);
    console.log("Type:- " +type+"\n Data:- "+ data)
  }

  //Check permission and return screens
  if(hasPermission === null){
    return(
      <View style={styles.container}>
      <Text>Requesting for Camera Pemission </Text>
    </View>
    )
  } 
  if(hasPermission === false){
    return(
      <View style={styles.container}>
      <Text>No access to Camera</Text>
      <Button title={'Allow Camera'} onPress={()=>askForCammeraPermission()} />
    </View>
    )
  }


//Return view
  return (
    <View style={styles.container}>

    <View style={styles.logo_container}>
        <Logo style={styles.logo}/>
    </View>

    <View style={styles.barcode_container}>
        <View style={styles.barcodebox}>
        <BarCodeScanner style={styles.barcode_scanner}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        
        />
        </View>

           
    </View>
    <View style={styles.text_container}>
                <Text style={styles.desc_1}>Welcome_to_VedPay </Text>
            </View>
    {/* <Button title={'scane again'} onPress={()=>handleBarCodeScanned()} color='tomato' /> */}
    {/* <Button  mode="contained" icon="camera" color="#EE4D00" onPress={()=>submit()}> Send </Button>     */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logo_container:{
    margin:"3%",
    marginTop:hp("5%")
},
barcode_container:{
    alignItems: 'center',
    justifyContent: 'center',
},
  barcodebox:{
    marginTop:hp("5%"),
    height:hp("48%"),
    width:wp("72%"),
    alignItems:'center',
    justifyContent:'center',
    overflow:'hidden',
    borderRadius:50,
    // backgroundColor:'grey',
  },
  barcode_scanner:{
    height:hp("80%"),
    width:wp("80%"),
  },
  text_container:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:hp("3%")
  },
  desc_1:{
      color:'green',
      fontWeight:"bold",
      fontSize: hp('5%'),
  }
});


