import  React,{useState,useEffect} from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View,KeyboardAvoidingView } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Logo from '../../Components/Logo/Logo';





export default function GettingStartedScreen() {
    const [modalVisible, setModalVisible] = useState(false);
useEffect(() => {
    setModalVisible(true)
}, [])
  return (
 <View style={styles.container}>
   <View style={styles.logo_container}>
    <Logo style={styles.logo}/>
   </View>

   <View style={styles.text_container}>
    <Text style={styles.desc_1}>
    Welcome Tag line
    </Text>
    <Text style={styles.desc_2}>
    Second Quote line
    </Text>
   </View>

   <View style={styles.modal_conatiner}>
   <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={styles.form_wrapper}>
          
              <TextInput
                label="Name"
                mode="outlined"
                style={styles.input_}
                outlineColor="green"
                activeOutlineColor="green"
                placeholder="Name"
          />

            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input_}
                outlineColor="green"
                activeOutlineColor="green"
                placeholder="Email"
          />     

                 <TextInput
                label="Phone Number"
                mode="outlined"
                style={styles.input_}
                outlineColor="green"
                activeOutlineColor="green"
                placeholder="+91"
                keyboardType="number-pad"
                
          />   
            
              </View>
          
               <Button mode="contained" 
               style={styles.btn_getStarted}  
               onPress={() => setModalVisible(!modalVisible)}
               color='green'>
                  Get Started
                 </Button>   
          </View>
        </View>
      </Modal>
   </View>
 
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  logo_container:{
      margin:"3%",
      marginTop:hp("5%")
  },
  text_container:{
      marginTop:hp("5%"),
      marginHorizontal:"4%"
  },
  desc_1:{
      fontWeight:"bold",
      fontSize: hp('3%'),
  },
  desc_2:{
    fontSize: hp('3%'),
},


centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
      width:wp("100%"),
      height:hp("70%"),
      marginTop:hp("30%"),
      padding:"8%",
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 9
  },
  btn_getStarted:{
      marginTop:hp("2%")
  },
  input_:{
      marginTop:hp("1%")
  }
});
