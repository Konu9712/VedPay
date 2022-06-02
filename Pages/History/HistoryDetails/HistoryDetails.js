import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Button, Card, IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../../Components/Modal/Modal";
import Divider from "../../../Components/Divider/Divider";

export default function HistoryMainScreen() {
  return (
    <View>
      <View style={styles.amout_wrapper}>
        <Text style={styles.currency}>Rs</Text>
        <Text style={styles.ammount}>50 </Text>
        <IconButton icon="check-decagram" color={"green"} size={30} />
      </View>
      <View>
        <ModalConatiner
          modalHeight={90}
          bulkProps={
            <>
              <View>
                <View style={styles.personContainer}>
                  <Avatar.Text size={50} label="TT" />
                  <View style={styles.personDetails}>
                    <Text style={styles.preposition}>To</Text>
                    <Text style={styles.personName}>Tirth VIT</Text>
                  </View>
                </View>
                <View style={styles.verifiedDetail}>
                  <Text style={styles.verifedPersonName}>
                    Verified Name: Tirth Patel $
                  </Text>
                  <Text style={styles.mobileNumber}>
                    /Linked Mobile No:+919898653{" "}
                  </Text>
                </View>

                <Divider />

                <View style={styles.senderContainer}>
                  <View style={styles.avatarContainer}>
                    <Avatar.Text size={50} label="VP" />

                    <View style={styles.walletDetails}>
                      <Text style={styles.preposition}>From</Text>
                      <Text style={styles.personName}>VedaPay Wallet</Text>
                    </View>
                  </View>

                  <View style={styles.transactionDetails}>
                    <Text style={styles.closingBalance}>At Closing $Rs23</Text>

                    <Text style={styles.transactionTiome}>
                      Event at $5:23 AM 12 May 2022
                    </Text>
                    <Text>Transaction Id: T489BDMD538</Text>
                  </View>
                </View>

                <View style={styles.payAgain_btn_container}>
                  <Button
                    mode="outlined"
                    uppercase={false}
                    style={styles.payAgain_btn}
                    onPress={() => console.log("Pay Again")}
                    color="green"
                  >
                    Pay Again
                  </Button>
                </View>
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
  },
  walletDetails: {
    marginLeft: wp("5%"),
  },
  preposition: {
    fontSize: hp("3%"),
  },
  personName: {
    fontSize: hp("4%"),
    fontWeight: "bold",
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
