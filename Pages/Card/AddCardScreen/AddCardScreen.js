import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import { Text, View, StyleSheet, BackHandler } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, TextInput, TextInputMask } from "react-native-paper";
import ModalConatiner from "../../../Components/Modal/Modal";

export default function AddCardScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }
  }, [isFocused]);

  const openCardCollectionScreen = () => {
    navigation.push("CardCollectionScreen");
  };
  return (
    <View>
      <View style={styles.text_container}>
        <Text style={styles.desc_1}>Add Card</Text>
      </View>
      <ModalConatiner
        ismodalOpen={modalVisible}
        modalHeight={70}
        navigation={navigation}
        bulkProps={
          <>
            <View style={styles.input_wrapper}>
              <TextInput
                label="Card Number"
                mode="flat"
                style={styles.card_number}
                outlineColor="green"
                activeUnderlineColor="green"
                placeholder="Card Number"
                keyboardType="number-pad"
              />
              <View style={styles.second_row}>
                <TextInput
                  label="Valid Till"
                  mode="flat"
                  style={styles.expiry_date}
                  outlineColor="green"
                  activeUnderlineColor="green"
                  placeholder="MM / YY"
                  keyboardType="number-pad"
                />

                <TextInput
                  label="CVV"
                  mode="flat"
                  style={styles.cvv}
                  outlineColor="green"
                  activeUnderlineColor="green"
                  placeholder="CVV"
                  keyboardType="number-pad"
                />
              </View>

              <TextInput
                label="Name on the card"
                mode="flat"
                style={styles.card_holder}
                outlineColor="green"
                activeUnderlineColor="green"
                placeholder="Card Holder"
                keyboardType="number-pad"
              />

              <Button
                mode="contained"
                style={styles.btn_getStarted}
                onPress={() => openCardCollectionScreen()}
                color="green"
              >
                Add Card
              </Button>
            </View>
          </>
        }
      />
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
  second_row: {
    flexDirection: "row",
    marginTop: hp("5%"),
  },
  expiry_date: {
    width: wp("30%"),
  },
  cvv: {
    width: wp("30%"),
    marginLeft: wp("20%"),
  },
  card_holder: {
    marginTop: hp("5%"),
  },
  btn_getStarted: {
    marginTop: hp("5%"),
  },
});
