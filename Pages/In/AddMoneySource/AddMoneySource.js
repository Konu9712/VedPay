import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Card, IconButton, Title } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../../Components/Modal/Modal";
import MasterCardLogo from "../../../Components/Logo/MasterCardLogo";
import RupayCardLogo from "../../../Components/Logo/RupayCardLogo";
import VisaCardLogo from "../../../Components/Logo/VisaCardLogo";
import UpiLogo from "../../../Components/Logo/UpiLogo";

export default function AddMoneySource() {
  const cardList = [1, 2, 3, 4];
  let colors = ["#b957f2", "#654321", "#c11381", "#abcdef", "#685f87"];

  const renderItem = ({ item, index }) => {
    return (
      <>
        <Card
          style={[
            styles.card,
            { backgroundColor: colors[index % colors.length] },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.cardLogo}>
              <MasterCardLogo />
              <Title style={styles.card_no}>*****976</Title>
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
        <ModalConatiner
          horizontal={true}
          modalHeight={90}
          bulkProps={
            <>
              <ScrollView>
                <FlatList data={cardList} renderItem={renderItem} />
                <Card
                  style={[
                    styles.card,
                    { backgroundColor: "grey", opacity: 0.7 },
                  ]}
                >
                  <View style={styles.upi_container}>
                    <UpiLogo />
                    <Title>user@vedPay.com</Title>
                  </View>
                </Card>
              </ScrollView>
            </>
          }
        />
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
    height: hp("13%"),
    marginTop: hp("1%"),
  },
  cardLogo: {
    marginTop: hp("1.2%"),
  },
  card_no: {
    marginLeft: wp("5%"),
  },
  upi_container: {
    flexDirection: "row",
    marginTop: hp("3%"),
    marginLeft: wp("2.5%"),
  },
});
