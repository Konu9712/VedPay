import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Avatar, Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../../Components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setOutAmount } from "../../../actions/outActions";
import { sendMoney } from "../../../services/outService";
import { getData } from "../../../services/localStorageService";
import Loader from "../../../Components/Loader/Loader";
import { isEmpty } from "../../../helper/commpn";
import AlertMessage from "../../../Components/Alert/AlertMessage";

export default function OutPayScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);

  const alertSelecter = useSelector((state) => state.message);
  const outSelecter = useSelector((state) => state.outReducer);
  const { outAmount, selectedContact, loading } = outSelecter;
  const { errorMessage } = alertSelecter;

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }
    return () => {
      setModalVisible(false);
    };
  }, [isFocused]);

  const onChangeInput = useCallback(
    (value) => {
      dispatch(setOutAmount(value));
    },
    [dispatch]
  );

  const openOutContactChatScreen = async () => {
    const userProfile = await dispatch(getData("userProfile"));
    dispatch(setOutAmount(null));

    const payload = {
      amount: Number(outAmount),
      receiverPhoneNumber: String(selectedContact?.phoneNumber),
    };
    if (payload) {
      const result = dispatch(sendMoney(userProfile?.userId, payload));
      if (result) {
        navigation.navigate("OutContactChatScreen");
      }
    }
  };

  const isAmountValid = () => {
    if (outAmount > 0) return false;
    else return true;
  };

  return (
    <View>
      <View style={styles.contact_Container}>
        <Avatar.Text
          size={50}
          label={selectedContact?.name?.substring(0, 2)}
          style={styles.contactAvatar}
        />
        <Text style={styles.contactName}>{selectedContact?.name} </Text>
      </View>
      {loading ? (
        <Loader />
      ) : !isEmpty(errorMessage) ? (
        <>
          <AlertMessage />
        </>
      ) : (
        <View style={styles.modal_wrapper}>
          <ModalConatiner
            ismodalOpen={modalVisible}
            modalHeight={70}
            navigation={navigation}
            bulkProps={
              <>
                <View style={styles.input_wrapper}>
                  <Text style={styles.in_modal_currancy}>₹</Text>
                  <TextInput
                    label="Name on the card"
                    mode="flat"
                    style={styles.input_amount}
                    outlineColor="green"
                    activeUnderlineColor="green"
                    placeholder="0"
                    keyboardType="number-pad"
                    value={outAmount}
                    onChangeText={(text) => onChangeInput(text)}
                  />
                </View>
                <View style={styles.add_btn_container}>
                  <Button
                    mode="contained"
                    style={styles.add_money_btn}
                    onPress={() => openOutContactChatScreen()}
                    disabled={isAmountValid()}
                    color="green"
                  >
                    Pay
                  </Button>
                </View>
              </>
            }
          />
        </View>
      )}
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
  input_wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("10%"),
  },
  in_modal_currancy: {
    fontWeight: "bold",
    fontSize: hp("4%"),
  },
  input_amount: {
    opacity: 0.5,
    marginLeft: wp("1%"),
    fontWeight: "bold",
    fontSize: hp("10%"),
    color: "green",
  },
  add_btn_container: {
    marginTop: hp("15%"),
  },
});
