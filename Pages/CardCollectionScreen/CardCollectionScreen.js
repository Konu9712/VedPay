import  React,{useState,useEffect} from 'react';
import {  Modal, StyleSheet, Text, Pressable, View, } from "react-native";
import { Button, Card, IconButton, Title } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Logo from '../../Components/Logo/Logo';
import MasterCardLogo from '../../Components/Logo/MasterCardLogo';
import RupayCardLogo from '../../Components/Logo/RupayCardLogo';
import VisaCardLogo from '../../Components/Logo/VisaCardLogo';





export default function GettingStartedScreen() {
    const [modalVisible, setModalVisible] = useState(false);
useEffect(() => {
    setModalVisible(true)
}, [])
  return (
 <View style={styles.container}>
 

   <View style={styles.text_container}>
    <Text style={styles.desc_1}>
    My Cards
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
              <View style={styles.cardWrapper}>

            <Card style={styles.card}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.cardLogo}>
                    <MasterCardLogo/>
                     <Title style={styles.card_no}>*****976</Title>
                    </View>
                    <View style={styles.delete_icon}>
                    <IconButton icon="trash-can" size={25} />
                    </View>
                </View>
            </Card>
              
            <Card style={styles.card2}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.cardLogo}>
                    <VisaCardLogo/>
                     <Title style={styles.card_no}>*****654</Title>
                    </View>
                    <View style={styles.delete_icon}>
                    <IconButton icon="trash-can" size={25} />
                    </View>
                </View>
            </Card>

            <Card style={styles.card3}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.cardLogo}>
                    <RupayCardLogo/>
                     <Title style={styles.card_no}>*****235</Title>
                    </View>
                    <View style={styles.delete_icon}>
                    <IconButton icon="trash-can" size={25} />
                    </View>
                </View>
            </Card>


            
              </View>
          
               <Button mode="contained" 
               style={styles.btn_getStarted}  
               onPress={() => setModalVisible(!modalVisible)}
               color='green'>
                 + Add Card 
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

  text_container:{
      marginTop:hp("10%"),
  
  },
  desc_1:{
      fontWeight:"bold",
      fontSize: hp('4%'),
      alignSelf: 'stretch',
      textAlign: 'center',
      color:'#ffff'
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
      width:wp("95%"),
      height:hp("80%"),
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
  cardLogo:{
    marginTop:hp("1.2%")
  },
  card:{
      height:hp("13%"),  
      marginTop:hp("1%"),
      backgroundColor:'#763568'
  },
  card2:{
    height:hp("13%"),  
    marginTop:hp("1%"),
    backgroundColor:'orange'
  },
  card3:{
    height:hp("13%"),  
    marginTop:hp("1%"),
    backgroundColor:'#009b7d'
  },
  card_no:{
      marginLeft:wp('5%')
  },
  delete_icon:{
    marginLeft:'auto',
    marginTop:'auto',
}
});
