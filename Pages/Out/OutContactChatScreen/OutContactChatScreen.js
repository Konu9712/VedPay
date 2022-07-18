import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, FlatList } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../../Components/Alert/AlertMessage";
import Divider from "../../../Components/Divider/Divider";
import Loader from "../../../Components/Loader/Loader";
import ModalConatiner from "../../../Components/Modal/Modal";
import { isEmpty } from "../../../helper/commpn";
import { getData } from "../../../services/localStorageService";
import { getContactTransactionHistory } from "../../../services/transactionService";

export default function OutContactChatScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);
  const [user, setUser] = useState();

  const alertSelecter = useSelector((state) => state.message);
  const outSelecter = useSelector((state) => state.outReducer);
  const transactionSelecter = useSelector((state) => state.transaction);

  const { selectedContact, loading: outLoader } = outSelecter;
  const { contactTransaction, loading: historyLoader } = transactionSelecter;
  const loading = outLoader || historyLoader;

  const { errorMessage } = alertSelecter;

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
      loadHistory();
    }
    return () => {
      setModalVisible(false);
    };
  }, [isFocused]);

  const loadHistory = async () => {
    const userProfile = await dispatch(getData("userProfile"));
    setUser(userProfile);
    if (userProfile && selectedContact) {
      const result = await dispatch(
        getContactTransactionHistory(
          userProfile?.userId,
          selectedContact?.phoneNumber
        )
      );
    }
  };

  const openOutPayScreen = () => {
    navigation.navigate("OutPayScreen");
  };

  const renderHistory = ({ item, index }) => {
    return (
      <>
        {user?.userId === item?.to ? (
          <>
            <Card style={[styles.reciverCard, styles.card]}>
              <View style={styles.reciverCardContent}>
                <View style={styles.reciverBar} />
                <View>
                  {item?.status === "successful" ? (
                    <>
                      <IconButton
                        icon="check-decagram"
                        color={"green"}
                        size={40}
                      />
                    </>
                  ) : (
                    <>
                      <IconButton icon="exclamation" color={"red"} size={40} />
                    </>
                  )}
                </View>
                <View>
                  <Text style={styles.amount}>Rs {item?.amount}</Text>
                  <Divider />
                  <Text>
                    {moment(item?.createdAt).format("DD MMM YYYY HH:MM A ")}
                  </Text>
                </View>
              </View>
            </Card>
          </>
        ) : user?.userId === item?.from ? (
          <>
            <Card style={[styles.senderCard, styles.card]}>
              <View style={styles.senderCardContent}>
                <View style={styles.senderDetails}>
                  <Text style={styles.amount}>Rs {item?.amount}</Text>
                  <Divider />
                  <Text>
                    {moment(item?.createdAt).format("DD MMM YYYY HH:MM A ")}
                  </Text>
                </View>
                <View>
                  {item?.status === "successful" ? (
                    <>
                      <IconButton
                        icon="check-decagram"
                        color={"green"}
                        size={40}
                      />
                    </>
                  ) : (
                    <>
                      <IconButton icon="exclamation" color={"red"} size={40} />
                    </>
                  )}
                </View>
                <View style={styles.senderBar} />
              </View>
            </Card>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <View>
      <View style={styles.contact_Container}>
        <Avatar.Text
          size={50}
          label={
            selectedContact?.name
              ? selectedContact?.name?.substring(0, 2)
              : "Vp"
          }
          style={styles.contactAvatar}
        />
        <Text style={styles.contactName}>{selectedContact?.name}</Text>
      </View>

      <View style={styles.modal_wrapper}>
        <ModalConatiner
          ismodalOpen={modalVisible}
          modalHeight={90}
          navigation={navigation}
          bulkProps={
            <>
              {loading ? (
                <View style={styles.loadinContainer}>
                  <Loader />
                </View>
              ) : !isEmpty(errorMessage) ? (
                <>
                  <AlertMessage />
                </>
              ) : (
                <View style={styles.modalContainer}>
                  <FlatList
                    horizontal={false}
                    data={contactTransaction}
                    renderItem={renderHistory}
                    keyExtractor={(item, index) => index.toString()}
                  />

                  {/* <Card style={styles.card}>
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
                </Card> */}

                  <View style={styles.inputChatContainer}>
                    <Button
                      mode="contained"
                      style={styles.pay_btn}
                      onPress={() => openOutPayScreen()}
                      color="green"
                    >
                      Pay
                    </Button>
                    <TextInput
                      style={styles.chatInput}
                      placeholder="Miss me ?"
                    />
                    <IconButton
                      icon="console-line"
                      size={20}
                      onPress={() => console.log("Pressed")}
                      style={styles.send_Icon}
                    />
                  </View>
                </View>
              )}
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
    paddingBottom: hp("20%"),
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
  loadinContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
