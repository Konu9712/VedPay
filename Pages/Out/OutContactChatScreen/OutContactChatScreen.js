import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Paragraph,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Divider from "../../../Components/Divider/Divider";
import ModalConatiner from "../../../Components/Modal/Modal";

export default function OutContactChatScreen({ navigation }) {
  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }
    return () => {
      setModalVisible(false);
    };
  }, [isFocused]);

  const openOutPayScreen = () => {
    navigation.navigate("OutPayScreen");
  };

  return (
    <View>
      <View style={styles.contact_Container}>
        <Avatar.Text size={50} label={"TT"} style={styles.contactAvatar} />
        <Text style={styles.contactName}>Tirth VIT </Text>
      </View>

      <View style={styles.modal_wrapper}>
        <ModalConatiner
          ismodalOpen={modalVisible}
          modalHeight={90}
          navigation={navigation}
          bulkProps={
            <>
              <View style={styles.modalContainer}>
                <Card style={[styles.reciverCard, styles.card]}>
                  <View style={styles.reciverCardContent}>
                    <View style={styles.reciverBar} />
                    <View>
                      <IconButton
                        icon="check-decagram"
                        color={"green"}
                        size={40}
                      />
                    </View>
                    <View>
                      <Text style={styles.amount}>Rs 170</Text>
                      <Divider />
                      <Text>24 Dec 2022 7:40 PM</Text>
                    </View>
                  </View>
                </Card>

                <Card style={[styles.senderCard, styles.card]}>
                  <View style={styles.senderCardContent}>
                    <View style={styles.senderDetails}>
                      <Text style={styles.amount}>Rs 680</Text>
                      <Divider />
                      <Text>6 Aug 2022 9:32 PM</Text>
                    </View>
                    <View>
                      <IconButton icon="exclamation" color={"red"} size={40} />
                    </View>
                    <View style={styles.senderBar} />
                  </View>
                </Card>

                <Card style={styles.card}>
                  <View style={styles.reciverTextContainer}>
                    <View style={styles.textreciverBar} />
                    <Paragraph style={styles.reciverText}>
                      Whats up man?
                    </Paragraph>
                  </View>
                </Card>

                <Card style={[styles.senderCard, styles.card]}>
                  <View style={styles.reciverTextContainer}>
                    <Paragraph style={styles.senderText}>I am good</Paragraph>
                    <View style={styles.textsenderBar} />
                  </View>
                </Card>

                <View style={styles.inputChatContainer}>
                  <Button
                    mode="contained"
                    style={styles.pay_btn}
                    onPress={() => openOutPayScreen()}
                    color="green"
                  >
                    Pay
                  </Button>
                  <TextInput style={styles.chatInput} placeholder="Miss me ?" />
                  <IconButton
                    icon="console-line"
                    size={20}
                    onPress={() => console.log("Pressed")}
                    style={styles.send_Icon}
                  />
                </View>
              </View>
            </>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contact_Container: {
    marginTop: hp("5%"),
    marginLeft: wp("10%"),
    flexDirection: "row",
    alignItems: "center",
  },
  contactAvatar: {
    backgroundColor: "green",
  },
  contactName: {
    fontWeight: "bold",
    fontSize: hp("3%"),
    color: "#ffff",
    marginLeft: wp("2%"),
  },
  modalContainer: {
    flex: 1,
  },
  card: {
    marginTop: hp("2%"),
    width: wp("50%"),
  },
  reciverCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  reciverBar: {
    height: hp("15%"),
    width: wp("1%"),
    backgroundColor: "#D81458",
  },
  reciverCard: {},
  amount: {
    fontWeight: "bold",
    fontSize: hp("3%"),
  },
  senderCard: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  senderCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  senderDetails: {
    marginRight: wp("1%"),
  },
  senderBar: {
    height: hp("15%"),
    width: wp("1%"),
    backgroundColor: "blue",
  },
  reciverTextContainer: {
    flexDirection: "row",
  },
  textreciverBar: {
    width: wp("1%"),
    backgroundColor: "#D81458",
  },
  reciverText: {
    marginLeft: wp("1%"),
  },
  senderText: {
    marginRight: wp("1%"),
  },
  textsenderBar: {
    width: wp("1%"),
    backgroundColor: "blue",
  },
  inputChatContainer: {
    position: "absolute",
    bottom: hp("10%"),
    flexDirection: "row",
  },
  chatInput: {
    marginLeft: wp("2%"),
    width: wp("58%"),
    borderRadius: 30,
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: wp("3%"),
  },
  pay_btn: {
    height: hp("5%"),
  },
  send_Icon: {
    height: 20,
  },
});
