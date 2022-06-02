import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../Components/Modal/Modal";

export default function HistoryMainScreen() {
  return (
    <View>
      <View style={styles.amout_wrapper}>
        <Text style={styles.currency}>Rs</Text>
        <Text style={styles.ammount}>1575 </Text>
      </View>
      <View>
        <ModalConatiner
          modalHeight={90}
          bulkProps={
            <>
              <View>
                <Card style={styles.card}>
                  <View style={styles.card_content}>
                    <IconButton
                      icon="arrow-bottom-left-thick"
                      color={"green"}
                      size={30}
                    />
                    <View style={styles.text_container}>
                      <Text>Card No:********9</Text>
                      <Text>Transaction Id: T489BDMD538</Text>
                    </View>
                    <View style={styles.ammount_wrapper}>
                      <Text style={styles.transaction_amount}>₹50 </Text>
                    </View>
                  </View>
                </Card>

                <Card style={styles.card}>
                  <View style={styles.card_content}>
                    <IconButton
                      icon="arrow-top-right-thick"
                      color={"red"}
                      size={30}
                    />
                    <View style={styles.text_container}>
                      <Text>Contact: Jay Patel</Text>
                      <Text>Transaction Id: T489BTED538</Text>
                    </View>
                    <View style={styles.ammount_wrapper}>
                      <Text style={styles.transaction_amount}>₹270 </Text>
                    </View>
                  </View>
                </Card>
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
    justifyContent: "center",
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
});
