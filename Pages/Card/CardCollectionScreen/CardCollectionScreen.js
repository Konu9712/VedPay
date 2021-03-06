import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Button, Card, IconButton, Title } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Logo from "../../../Components/Logo/Logo";
import MasterCardLogo from "../../../Components/Logo/MasterCardLogo";
import RupayCardLogo from "../../../Components/Logo/RupayCardLogo";
import VisaCardLogo from "../../../Components/Logo/VisaCardLogo";
import ModalConatiner from "../../../Components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCardService, getCardList } from "../../../services/cardService";
import { getData } from "../../../services/localStorageService";
import { CARD_TYPE } from "../../../helper/constant";
import AlertMessage from "../../../Components/Alert/AlertMessage";
import { isEmpty } from "../../../helper/commpn";
import Loader from "../../../Components/Loader/Loader";
import EmptyCardCollectionScreen from "./EmptyCardCollectionScreen";
import { setSelectedCard } from "../../../actions/cardActions";

export default function CardCollectionScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);

  const cardSelector = useSelector((state) => state.card);
  const alertSelecter = useSelector((state) => state.message);

  const { cardList, loading } = cardSelector;
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

  const openAddCardScreen = () => {
    navigation.navigate("AddCardScreen");
  };

  const openCardTransactionListScreen = async (item) => {
    if (item) {
      await setModalVisible(false);
      dispatch(setSelectedCard(item));
      navigation.navigate("CardTransactionListScreen");
    }
  };

  const deleteCard = async (card) => {
    const userProfile = await dispatch(getData("userProfile"));
    const result = await dispatch(
      deleteCardService(userProfile?.userId, card?.cardId)
    );
    if (result) {
      loadData();
    }
  };

  const renderCardList = ({ item, index }) => {
    let colors = ["#685f87", "#654321", "#763568", "#aa6f73", "#004c4c"];
    return (
      <View key={`cardCollection + ${index}`}>
        <Card
          style={[
            styles.card,
            { backgroundColor: colors[index % colors.length] },
          ]}
          onPress={() => {
            openCardTransactionListScreen(item);
          }}
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
              <Title style={styles.card_no}>
                *****{String(item?.cardNumber).slice(-4)}
              </Title>
            </View>
            <View style={styles.delete_icon}>
              <TouchableOpacity onPress={() => deleteCard(item)}>
                <IconButton icon="trash-can" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.desc_1}>My Cards</Text>
      </View>
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
            <>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.cardWrapper}>
                    {isEmpty(cardList) ? (
                      <>
                        <View style={styles.emptyStateContainer}>
                          <EmptyCardCollectionScreen />
                        </View>
                      </>
                    ) : (
                      <FlatList
                        data={cardList}
                        renderItem={renderCardList}
                        keyExtractor={(item) => item.cardId}
                      />
                    )}
                  </View>

                  <Button
                    mode="contained"
                    style={styles.btn_getStarted}
                    onPress={() => openAddCardScreen()}
                    color="green"
                    disabled={cardList?.length === 3}
                  >
                    + Add Card
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
  container: {},

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
  desc_2: {
    fontSize: hp("3%"),
  },
  btn_getStarted: {
    marginTop: hp("2%"),
  },
  cardLogo: {
    marginTop: hp("1.2%"),
  },
  emptyStateContainer: {
    height: hp("50%"),
  },
  card: {
    height: hp("13%"),
    marginTop: hp("1%"),
  },
  card_no: {
    marginLeft: wp("5%"),
  },
  delete_icon: {
    marginLeft: "auto",
    marginTop: "auto",
  },
});
