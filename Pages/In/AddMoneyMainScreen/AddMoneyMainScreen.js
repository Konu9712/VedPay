import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { setInAmount } from "../../../actions/inActions";
import AlertMessage from "../../../Components/Alert/AlertMessage";
import Loader from "../../../Components/Loader/Loader";
import ModalConatiner from "../../../Components/Modal/Modal";
import { isEmpty } from "../../../helper/commpn";
import { getTotalBalance } from "../../../services/authService";
import { getData } from "../../../services/localStorageService";

export default function AddMoneyMainScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);

  const authSelector = useSelector((state) => state.auth);
  const inSelector = useSelector((state) => state.inReducer);

  const alertSelecter = useSelector((state) => state.message);

  const { totalBalance } = authSelector;
  const { inAmount, loading } = inSelector;
  const { errorMessage } = alertSelecter;

  // console.log("inSelector", inSelector);

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
      loadData();
    }
    return () => {
      setModalVisible(false);
    };
  }, [isFocused]);

  const loadData = async () => {
    const userProfile = await dispatch(getData("userProfile"));
    const result = await dispatch(getTotalBalance(userProfile?.userId));
  };

  const openAddMoneySource = () => {
    navigation.navigate("AddMoneySource");
  };

  const onChangeInput = useCallback(
    (value) => {
      dispatch(setInAmount(value));
    },
    [dispatch]
  );

  const isAmountValid = () => {
    if (inAmount > 0) return false;
    else return true;
  };

  return (
    <View>
      <View style={styles.amout_wrapper}>
        <Text style={styles.currency}>₹ </Text>
        <Text style={styles.ammount}>{totalBalance} </Text>
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
                    keyboardType="numeric"
                    value={inAmount}
                    onChangeText={(text) => onChangeInput(text)}
                  />
                </View>
                <View style={styles.add_btn_container}>
                  <Button
                    mode="contained"
                    style={styles.add_money_btn}
                    disabled={isAmountValid()}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  amout_wrapper: {
    marginTop: hp("10%"),
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  currency: {
    fontWeight: "bold",
    fontSize: hp("4%"),
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
