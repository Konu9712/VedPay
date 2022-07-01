import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import { Text, View, StyleSheet, BackHandler } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, TextInput, TextInputMask } from "react-native-paper";
import ModalConatiner from "../../../Components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addCardAction } from "../../../actions/cardActions";
import { CreditCardInput } from "react-native-credit-card-input-plus";
import { addCardService } from "../../../services/cardService";
import Loader from "../../../Components/Loader/Loader";
import AlertMessage from "../../../Components/Alert/AlertMessage";
import { isEmpty } from "../../../helper/commpn";
import { getData } from "../../../services/localStorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddCardScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);

  const cardSelector = useSelector((state) => state.card);
  const alertSelecter = useSelector((state) => state.message);

  const { addCard, loading } = cardSelector;
  const { errorMessage } = alertSelecter;

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }
    return () => {
      setModalVisible(false);
      dispatch(addCardAction());
    };
  }, [isFocused]);

  const onChangeCardInput = useCallback(
    (form) => {
      const { number, cvc, expiry, ...otherValues } = form?.values;
      const cardValues = {
        cvv: cvc,
        cardNumber: number.replace(/ /g, ""),
        expiry: expiry.replace("/", ""),
        ...otherValues,
      };
      dispatch(addCardAction(cardValues));
    },
    [dispatch]
  );

  const openCardCollectionScreen = async () => {
    const userProfile = await dispatch(getData("userProfile"));
    let result = await dispatch(addCardService(addCard, userProfile?.userId));
    if (result) {
      await setModalVisible(false);
      navigation.push("CardCollectionScreen");
    }
  };

  const eraseCardDetails = () => {
    dispatch(addCardAction());
  };

  return (
    <View>
      <View style={styles.text_container}>
        <Text style={styles.desc_1}>Add Card</Text>
      </View>
      {loading ? (
        <Loader />
      ) : !isEmpty(errorMessage) ? (
        <>
          <AlertMessage />
          {() => this.eraseCardDetails}
        </>
      ) : (
        <ModalConatiner
          ismodalOpen={modalVisible}
          modalHeight={70}
          navigation={navigation}
          bulkProps={
            <>
              <View style={styles.input_wrapper}>
                <View style={styles.cardWrapper}>
                  <CreditCardInput
                    placeholders={{
                      number: "1234 5678 1234 5678",
                      expiry: "MM/YY",
                      cvc: "CVV",
                      name: "Name on Card",
                    }}
                    labels={{
                      number: "CARD NUMBER",
                      expiry: "EXPIRY",
                      cvc: "CVV",
                      name: "NAME ON CARD",
                    }}
                    labelStyle={styles.inputLabel}
                    inputContainerStyle={{
                      maxWidth: wp("50%"),
                      borderBottomWidth: 0.5,
                      borderBottomColor: "black",
                    }}
                    requiresName={true}
                    allowScroll={true}
                    addtionalInputsProps={addCard}
                    onChange={(form) => {
                      onChangeCardInput(form);
                    }}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <Button
                    mode="contained"
                    style={styles.btn_getStarted}
                    onPress={() => openCardCollectionScreen()}
                    color="green"
                  >
                    Add Card
                  </Button>
                </View>
              </View>
            </>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text_container: {
    marginTop: hp("10%"),
  },
  desc_1: {
    fontWeight: "bold",
    fontSize: hp("4%"),
    alignSelf: "stretch",
    textAlign: "center",
    color: "#ffff",
  },
  inputLabel: {
    marginTop: hp("4%"),
  },
  buttonWrapper: {
    marginTop: hp("5%"),
  },
});
