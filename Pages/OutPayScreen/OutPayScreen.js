import * as React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Avatar, Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../Components/Modal/Modal";

export default function OutPayScreen() {
  return (
    <View>
      <View style={styles.contact_Container}>
        <Avatar.Text size={50} label={"TT"} style={styles.contactAvatar} />
        <Text style={styles.contactName}>Tirth VIT </Text>
      </View>

      <View style={styles.modal_wrapper}>
        <ModalConatiner
          modalHeight={70}
          bulkProps={
            <>
              <View style={styles.input_wrapper}>
                <Text style={styles.in_modal_currancy}>Rs</Text>
                <TextInput
                  label="Name on the card"
                  mode="flat"
                  style={styles.input_amount}
                  outlineColor="green"
                  activeUnderlineColor="green"
                  placeholder="0"
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.add_btn_container}>
                <Button
                  mode="contained"
                  style={styles.add_money_btn}
                  onPress={() => console.log("add_money_btn")}
                  color="green"
                >
                  Pay
                </Button>
              </View>
            </>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contact_Container: {
    marginTop: hp("5%"),
    marginLeft: wp("10%"),
    flexDirection: "row",
    alignItems: "center",
  },
  contactAvatar: {
    backgroundColor: "green",
  },
  contactName: {
    fontWeight: "bold",
    fontSize: hp("3%"),
    color: "#ffff",
    marginLeft: wp("2%"),
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
    fontSize: hp("3%"),
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
