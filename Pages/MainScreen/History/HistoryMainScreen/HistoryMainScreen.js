import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Card, IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../../../Components/Modal/Modal";
import { getData } from "../../../../services/localStorageService";
import { getTotalBalance } from "../../../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { getGlobalTransactionHistory } from "../../../../services/transactionService";
import { setTransactionDetails } from "../../../../actions/transactionActions";
import Loader from "../../../../Components/Loader/Loader";
import { isEmpty } from "../../../../helper/commpn";
import AlertMessage from "../../../../Components/Alert/AlertMessage";

export default function HistoryMainScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);
  const [user, setUser] = useState();

  const authSelector = useSelector((state) => state.auth);
  const alertSelecter = useSelector((state) => state.message);
  const transactionSelecter = useSelector((state) => state.transaction);

  const { totalBalance, loading: authLoader } = authSelector;
  const { globalTransaction, loading: historyLoader } = transactionSelecter;

  let loading = historyLoader || authLoader;

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
    setUser(userProfile);
    if (userProfile) {
      const result = await dispatch(getTotalBalance(userProfile?.userId));
      const history = await dispatch(
        getGlobalTransactionHistory(userProfile?.userId)
      );
    }
  };

  const openHistoryDetails = (item) => {
    if (item) {
      dispatch(setTransactionDetails(item));
      navigation.navigate("HistoryDetails");
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <Card
          style={styles.card}
          mode="outlined"
          onPress={() => openHistoryDetails(item)}
        >
          <View style={styles.card_content}>
            {item?.to === "Wallet" || item?.to === user?.userId ? (
              <IconButton
                icon="arrow-bottom-left-thick"
                color={"green"}
                size={30}
              />
            ) : (
              <IconButton
                icon="arrow-top-right-thick"
                color={"red"}
                size={30}
              />
            )}
            <View style={styles.text_container}>
              <Text>
                {item?.cardDetails
                  ? `Card No: ******${String(
                      item?.cardDetails?.cardNumber
                    )?.slice(-4)}`
                  : item?.reciver
                  ? `Contact: ${item?.reciver?.name}`
                  : item?.sender
                  ? `From: ${item?.sender?.name}`
                  : ""}
              </Text>
              <Text>Transaction Id: {item?.transactionID}</Text>
            </View>
            <View style={styles.ammount_wrapper}>
              <Text style={styles.transaction_amount}>₹{item?.amount} </Text>
            </View>
          </View>
        </Card>

        {/* <Card style={styles.card} mode="outlined">
          <View style={styles.card_content}>
            <IconButton icon="arrow-top-right-thick" color={"red"} size={30} />
            <View style={styles.text_container}>
              <Text>Contact: Jay Patel</Text>
              <Text>Transaction Id: T489BTED538</Text>
            </View>
            <View style={styles.ammount_wrapper}>
              <Text style={styles.transaction_amount}>₹270 </Text>
            </View>
          </View>
        </Card> */}
      </>
    );
  };

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
            modalHeight={90}
            navigation={navigation}
            bulkProps={
              <>
                <FlatList
                  data={globalTransaction}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.historyList}
                />
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
  card: {
    padding: "3%",
    marginTop: hp("1%"),
  },
  card_content: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: hp("0.5%"),
  },
  ammount_wrapper: {
    marginLeft: wp("3%"),
  },
  transaction_amount: {
    fontWeight: "bold",
    fontSize: hp("4%"),
  },
  historyList: {
    marginBottom: hp("9%"),
  },
});
