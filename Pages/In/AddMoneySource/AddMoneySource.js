import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Card, Title, Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../../Components/Modal/Modal";
import MasterCardLogo from "../../../Components/Logo/MasterCardLogo";
import RupayCardLogo from "../../../Components/Logo/RupayCardLogo";
import VisaCardLogo from "../../../Components/Logo/VisaCardLogo";
import UpiLogo from "../../../Components/Logo/UpiLogo";
import { useIsFocused } from "@react-navigation/native";
import { getData } from "../../../services/localStorageService";
import { getCardList } from "../../../services/cardService";
import { useDispatch, useSelector } from "react-redux";
import { CARD_TYPE } from "../../../helper/constant";
import { isEmpty } from "../../../helper/commpn";
import EmptyCardCollectionScreen from "../../Card/CardCollectionScreen/EmptyCardCollectionScreen";
import AlertMessage from "../../../Components/Alert/AlertMessage";
import Loader from "../../../Components/Loader/Loader";
import { addMoney } from "../../../services/inService";
import { setInAmount } from "../../../actions/inActions";

export default function AddMoneySource({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);

  const cardSelector = useSelector((state) => state.card);
  const inSelector = useSelector((state) => state.inReducer);
  const alertSelecter = useSelector((state) => state.message);

  const { cardList, loading } = cardSelector;
  const { inAmount } = inSelector;
  const { errorMessage } = alertSelecter;

  useEffect(() => {
    if (isFocused) {
      loadData();
      setModalVisible(true);
    }
    return () => {
      setModalVisible(false);
    };
  }, [isFocused]);

  const loadData = async () => {
    const userProfile = await dispatch(getData("userProfile"));
    const result = await dispatch(getCardList(userProfile?.userId));
  };

  let colors = ["#685f87", "#654321", "#763568", "#aa6f73", "#004c4c"];

  const openAddMoneySuccessfully = async (cardId) => {
    const userProfile = await dispatch(getData("userProfile"));
    const payload = {
      amount: inAmount,
    };
    const result = await dispatch(
      addMoney(userProfile?.userId, cardId, payload)
    );
    if (result) {
      dispatch(setInAmount(null));
      navigation.navigate("AddMoneySuccessfully");
    }
  };

  const openAddCardScreen = () => {
    navigation.navigate("Card", { screen: "AddCardScreen" });
  };

  const renderCardList = ({ item, index }) => {
    const cardNumber = String(item?.cardNumber);
    const lastFourDigit = cardNumber?.slice(cardNumber.length - 4);
    // if (index === 5) {
    //   // ONLY for UI purpose in UPI [You can give type from backend]
    //   return (
    //     <Card style={[styles.card, { backgroundColor: "grey", opacity: 0.7 }]}>
    //       <View style={styles.upi_container}>
    //         <UpiLogo />
    //         <Title>user@vedPay.com</Title>
    //       </View>
    //     </Card>
    //   );
    // }
    const expiryDate = item?.expiry?.replace(/.(?=(..)*..$)/g, "$&/");
    return (
      <>
        <Card
          onPress={() => {
            openAddMoneySuccessfully(item?.cardId);
          }}
          style={[
            styles.card,
            { backgroundColor: colors[index % colors.length] },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.cardLogo}>
              {item?.type === CARD_TYPE.MASTER ? (
                <MasterCardLogo />
              ) : item?.type === CARD_TYPE.VISA ? (
                <VisaCardLogo />
              ) : item?.type === CARD_TYPE.RUPAY ? (
                <RupayCardLogo />
              ) : (
                <></>
              )}
              <Title style={styles.card_no}>*****{lastFourDigit}</Title>
              <View style={styles.cardDetailWrapper}>
                <Text style={styles.cardHolder}>{item?.name}</Text>
                <Text style={styles.expiryDate}>Expiry: {expiryDate}</Text>
              </View>
            </View>
          </View>
        </Card>
      </>
    );
  };

  return (
    <View>
      <View style={styles.text_container}>
        <Text style={styles.desc_1}>Source</Text>
      </View>
      <View style={styles.modal_container}>
        {loading ? (
          <Loader />
        ) : !isEmpty(errorMessage) ? (
          <>
            <AlertMessage />
          </>
        ) : (
          <ModalConatiner
            ismodalOpen={modalVisible}
            modalHeight={70}
            navigation={navigation}
            bulkProps={
              <View>
                {isEmpty(cardList) ? (
                  <>
                    <View style={styles.emptyStateContainer}>
                      <EmptyCardCollectionScreen />
                      <Button
                        mode="contained"
                        style={styles.btn_getStarted}
                        onPress={() => openAddCardScreen()}
                        color="green"
                      >
                        + Add Card
                      </Button>
                    </View>
                  </>
                ) : (
                  <>
                    <FlatList
                      data={cardList}
                      renderItem={renderCardList}
                      keyExtractor={(item, index) => index.toString()}
                      style={styles.sourceList}
                    />
                  </>
                )}
              </View>
            }
          />
        )}
      </View>
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
  card: {
    marginTop: hp("1%"),
    paddingVertical: hp("1%"),
  },
  cardLogo: {
    marginTop: hp("1.2%"),
  },
  card_no: {
    marginLeft: wp("5%"),
    color: "white",
  },
  cardDetailWrapper: {
    width: wp("70%"),
    flexDirection: "row",
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("1%"),
    justifyContent: "space-between",
  },
  upi_container: {
    flexDirection: "row",
    marginTop: hp("3%"),
    marginLeft: wp("2.5%"),
  },
  sourceList: {
    marginBottom: hp("8%"),
  },
  emptyStateContainer: {
    height: hp("50%"),
  },
  cardHolder: {
    color: "white",
  },
  expiryDate: {
    color: "white",
  },
});
