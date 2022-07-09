import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Chip, IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../../Components/Alert/AlertMessage";
import Loader from "../../../Components/Loader/Loader";
import ModalConatiner from "../../../Components/Modal/Modal";
import { isEmpty } from "../../../helper/commpn";
import { getTotalBalance } from "../../../services/authService";
import { getData } from "../../../services/localStorageService";

export default function AddMoneySuccessfully({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);

  const authSelector = useSelector((state) => state.auth);
  const transactionSelector = useSelector((state) => state.transaction);
  const cardSelector = useSelector((state) => state.card);
  const alertSelecter = useSelector((state) => state.message);

  const { totalBalance } = authSelector;
  const { transactionDetail, loading } = transactionSelector;
  const { cardList } = cardSelector;
  const { errorMessage } = alertSelecter;
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

  const sourceOfTransaction = () => {
    const sourceCard = cardList.find(
      (x) => x.cardId === transactionDetail?.from
    );
    const sourceCardNumber = String(sourceCard?.cardNumber);
    const lastFourDigit = sourceCardNumber?.slice(sourceCardNumber.length - 4);
    return `********${lastFourDigit}`;
  };

  sourceOfTransaction();

  return (
    <View>
      <View style={styles.amout_wrapper}>
        <Text style={styles.currency}>₹</Text>
        <Text style={styles.ammount}>{totalBalance} </Text>
      </View>
      {loading ? (
        <Loader />
      ) : !isEmpty(errorMessage) ? (
        <>
          <AlertMessage />
        </>
      ) : (
        <View>
          <ModalConatiner
            ismodalOpen={modalVisible}
            modalHeight={70}
            navigation={navigation}
            onBackPushToMain={true}
            bulkProps={
              <>
                <View>
                  <Text>From: {sourceOfTransaction()} </Text>
                  <Text>
                    Transaction ID: {transactionDetail?.transactionID}{" "}
                  </Text>
                  <View style={styles.modalAmount_Wrapper}>
                    <Text style={styles.addedamount}>
                      ₹ {transactionDetail?.amount}{" "}
                    </Text>
                    <IconButton
                      icon="check-decagram"
                      color={"green"}
                      size={30}
                    />
                  </View>
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
    marginHorizontal: wp("15%"),
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
  modalAmount_Wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp("40%"),
    marginLeft: wp("18%"),
    width: wp("40%"),
    height: hp("10%"),
    backgroundColor: "lightgrey",
    borderRadius: 35,
  },
  addedamount: {
    fontWeight: "bold",
    fontSize: hp("3%"),
  },
});
