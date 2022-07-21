import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Button, Card, IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../../../Components/Modal/Modal";
import Divider from "../../../../Components/Divider/Divider";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../services/localStorageService";
import moment from "moment";
import { setSelectedContact } from "../../../../actions/outActions";
import Loader from "../../../../Components/Loader/Loader";
import { isEmpty } from "../../../../helper/commpn";
import AlertMessage from "../../../../Components/Alert/AlertMessage";

export default function HistoryDetails({ navigation }) {
  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const alertSelecter = useSelector((state) => state.message);
  const transactionSelecter = useSelector((state) => state.transaction);

  const { transactionDetail, loading } = transactionSelecter;
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
  };

  const payAgain = (item) => {
    if (item?.cardDetails) {
      navigation.navigate("Card", { screen: "CardCollectionScreen" });
    }
  };

  return (
    <View>
      <View style={styles.amout_wrapper}>
        <Text style={styles.currency}>₹</Text>
        <Text style={styles.ammount}>{transactionDetail?.amount} </Text>
        <IconButton icon="check-decagram" color={"green"} size={30} />
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
                <View>
                  <View style={styles.personContainer}>
                    <Avatar.Text
                      size={50}
                      label={
                        transactionDetail?.reciver
                          ? transactionDetail?.reciver?.name?.substring(0, 2)
                          : transactionDetail?.cardDetails
                          ? "VP"
                          : transactionDetail?.to === user?.userId
                          ? user?.name?.substring(0, 2)
                          : "Vp"
                      }
                    />
                    <View style={styles.personDetails}>
                      <Text style={styles.preposition}>To</Text>
                      <Text style={styles.personName}>
                        {transactionDetail?.reciver
                          ? transactionDetail?.reciver?.name
                          : transactionDetail?.cardDetails
                          ? "VedPay Wallet"
                          : transactionDetail?.to === user?.userId
                          ? "VedPay Wallet"
                          : "Vp"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.verifiedDetail}>
                    {/* <Text style={styles.verifedPersonName}>
                    Verified Name: Tirth Patel $
                  </Text> */}
                    <Text style={styles.mobileNumber}>
                      {transactionDetail?.reciver
                        ? ` Mobile No: ${transactionDetail?.reciver?.phoneNumber}`
                        : transactionDetail?.cardDetails
                        ? "VedPay Wallet"
                        : "VedPay Wallet"}
                    </Text>
                  </View>

                  <Divider />

                  <View style={styles.senderContainer}>
                    <View style={styles.avatarContainer}>
                      <Avatar.Text
                        size={50}
                        label={
                          transactionDetail?.cardDetails
                            ? `CA`
                            : transactionDetail?.from === user?.userId
                            ? user?.name?.substring(0, 2)
                            : transactionDetail?.to === user?.userId
                            ? transactionDetail?.sender?.name?.substring(0, 2)
                            : "Vp"
                        }
                      />

                      <View style={styles.walletDetails}>
                        <Text style={styles.preposition}>From</Text>
                        <Text style={styles.personName}>
                          {transactionDetail?.cardDetails
                            ? `Card No: ******${String(
                                transactionDetail?.cardDetails?.cardNumber
                              )?.slice(-4)}`
                            : transactionDetail?.from === user?.userId
                            ? "VedPay Wallet"
                            : transactionDetail?.to === user?.userId
                            ? transactionDetail?.sender?.name
                            : ""}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.transactionDetails}>
                      <Text style={styles.closingBalance}>
                        {transactionDetail?.to === user?.userId
                          ? ` Contact No. ${transactionDetail?.sender?.phoneNumber}`
                          : ""}
                      </Text>

                      <Text style={styles.transactionTiome}>
                        {/* Event at $5:23 AM 12 May 2022{" "} */}
                        {moment(transactionDetail?.createdAt).format(
                          "DD MMM YYYY  HH:MM A"
                        )}
                      </Text>
                      <Text>
                        Transaction Id: {transactionDetail?.transactionID}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.payAgain_btn_container}>
                    {transactionDetail?.cardDetails && (
                      <Button
                        mode="outlined"
                        uppercase={false}
                        style={styles.payAgain_btn}
                        onPress={() => payAgain(transactionDetail)}
                        color="green"
                      >
                        Reload
                      </Button>
                    )}
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
  personContainer: {
    flexDirection: "row",
  },
  personDetails: {
    marginLeft: wp("5%"),
    width: wp("60%"),
  },
  walletDetails: {
    marginLeft: wp("5%"),
    width: wp("60%"),
  },
  preposition: {
    fontSize: hp("3%"),
  },
  personName: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: "black",
  },
  verifiedDetail: {
    marginTop: hp("2.5%"),
  },
  verifedPersonName: {
    fontSize: hp("2.5%"),
  },
  mobileNumber: {
    fontSize: hp("2.5%"),
  },
  payAgain_btn_container: {
    marginTop: hp("2.5%"),
    width: wp("40%"),
  },
  closingBalance: {
    fontSize: hp("2.5%"),
    marginTop: hp("1%"),
  },
  senderContainer: {
    marginTop: hp("2.5%"),
  },
  avatarContainer: {
    flexDirection: "row",
  },
  transactionDetails: {
    marginTop: hp("1%"),
  },
});
