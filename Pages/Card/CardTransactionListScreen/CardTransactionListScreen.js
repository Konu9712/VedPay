import React, { useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card, DataTable, IconButton, Title } from "react-native-paper";
import MasterCardLogo from "../../../Components/Logo/MasterCardLogo";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../services/localStorageService";
import { getCardTransactionHistory } from "../../../services/transactionService";
import { CARD_TYPE } from "../../../helper/constant";
import VisaCardLogo from "../../../Components/Logo/VisaCardLogo";
import RupayCardLogo from "../../../Components/Logo/RupayCardLogo";
import Cardlogo from "../../../Components/Logo/Cardlogo";
import moment from "moment";
import { isEmpty } from "../../../helper/commpn";
import CardTransactionEmptyState from "./CardTransactionEmptyState";
import Loader from "../../../Components/Loader/Loader";
import AlertMessage from "../../../Components/Alert/AlertMessage";

export default function CardTransactionListScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const alertSelecter = useSelector((state) => state.message);
  const cardSelector = useSelector((state) => state.card);
  const transactionSelecter = useSelector((state) => state.transaction);

  const { errorMessage } = alertSelecter;
  const { selectedCard } = cardSelector;
  const { cardTransaction, loading } = transactionSelecter;

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const loadData = async () => {
    if (selectedCard) {
      const userProfile = await dispatch(getData("userProfile"));
      const result = await dispatch(
        getCardTransactionHistory(userProfile?.userId, selectedCard?.cardId)
      );
    }
  };

  const transctionList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const renderCardTransaction = ({ item, index }) => {
    let colors = [
      "#685f87",
      "#654321",
      "#763568",
      "#aa6f73",
      "#004c4c",
      "#b957f2",
    ];
    return (
      <>
        <Card
          key={`Card_Transaction_History_${transctionList}`}
          style={{
            height: hp("20%"),
            marginTop: hp("1%"),
            backgroundColor: colors[index % colors.length],
            opacity: 0.8,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.cardLogo}>
              {selectedCard?.type === CARD_TYPE.MASTER ? (
                <MasterCardLogo />
              ) : selectedCard?.type === CARD_TYPE.VISA ? (
                <VisaCardLogo />
              ) : selectedCard?.type === CARD_TYPE.RUPAY ? (
                <RupayCardLogo />
              ) : (
                <Cardlogo />
              )}
              {/* <MasterCardLogo /> */}
              <Title style={styles.card_no}>
                *****{String(selectedCard?.cardNumber).slice(-4)}
              </Title>
            </View>
            <View style={styles.detail_wrapper}>
              <Text style={styles.details}>
                Transaction Id: {item?.transactionID}
              </Text>
              <Text style={styles.date}>
                {moment(item?.createdAt).format("DD MMM YYYY HH:MM A")}
              </Text>
            </View>
            <View style={styles.amount_wrapper}>
              <IconButton icon="check-circle" size={25} color="green" />
              <Text style={styles.amopunt_desc}>₹{item?.amount}</Text>
            </View>
          </View>
        </Card>
      </>
    );
  };

  return (
    <View>
      <View style={styles.main_table}>
        {loading ? (
          <Loader />
        ) : !isEmpty(errorMessage) ? (
          <>
            <AlertMessage />
          </>
        ) : isEmpty(cardTransaction) ? (
          <>
            <CardTransactionEmptyState />
          </>
        ) : (
          <FlatList
            data={cardTransaction}
            renderItem={renderCardTransaction}
            keyExtractor={(item) => item.transactionId}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_table: {
    marginTop: hp("5%"),
    marginHorizontal: wp("0.8%"),
  },
  card: {},
  card1: {
    height: hp("20%"),
    marginTop: hp("1%"),
    backgroundColor: "#D6AB80",
    opacity: 0.8,
  },
  card2: {
    height: hp("20%"),
    marginTop: hp("1%"),
    backgroundColor: "#c4d8e2",
    opacity: 0.8,
  },
  cardLogo: {
    marginTop: hp("5%"),
  },
  card_no: {
    marginLeft: wp("5%"),
    color: "white",
  },
  detail_wrapper: {
    marginTop: hp("7%"),
    marginLeft: wp("4%"),
    width: wp("40%"),
  },
  details: {
    fontWeight: "bold",
    fontSize: hp("2%"),
    color: "white",
  },
  date: {
    fontWeight: "bold",
    fontSize: hp("2%"),
    color: "white",
    marginTop: hp("2%"),
  },
  amount_wrapper: {
    marginTop: hp("5%"),
    width: wp("26%"),
  },
  amopunt_desc: {
    color: "white",
    marginTop: hp("0%"),
    marginLeft: wp("4%"),
    fontWeight: "bold",
    fontSize: hp("3.4%"),
    alignSelf: "stretch",
  },
});
