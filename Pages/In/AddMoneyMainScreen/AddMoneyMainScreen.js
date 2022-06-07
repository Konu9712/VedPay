import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../../Components/Modal/Modal";

export default function AddMoneyMainScreen({ navigation }) {
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

  const openAddMoneySource = () => {
    navigation.navigate("AddMoneySource");
  };
  return (
    <View>
      <View style={styles.amout_wrapper}>
        <Text style={styles.currency}>Rs</Text>
        <Text style={styles.ammount}>1423 </Text>
      </View>

      <View style={styles.modal_wrapper}>
        <ModalConatiner
          ismodalOpen={modalVisible}
          modalHeight={70}
          navigation={navigation}
          bulkProps={
            <>
              <View style={styles.input_wrapper}>
                <Text style={styles.in_modal_currancy}>Rs</Text>
                <TextInput
                  label="Name on the card"
                  mode="flat"
                  style={styles.input_amount}
                  outlineColor="green"
                  activeUnderlineColor="green"
                  placeholder="0"
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.add_btn_container}>
                <Button
                  mode="contained"
                  style={styles.add_money_btn}
                  onPress={() => openAddMoneySource()}
                  color="green"
                >
                  ADD
                </Button>
              </View>
            </>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amout_wrapper: {
    marginTop: hp("10%"),
    marginHorizontal: wp("35%"),
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  currency: {
    fontWeight: "bold",
    fontSize: hp("3%"),
    color: "#ffff",
  },
  ammount: {
    fontWeight: "bold",
    fontSize: hp("6%"),
    color: "#ffff",
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
    fontSize: hp("3%"),
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
