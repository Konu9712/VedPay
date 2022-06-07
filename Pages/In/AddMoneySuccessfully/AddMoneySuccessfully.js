import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Chip, IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../../Components/Modal/Modal";

export default function AddMoneySuccessfully({ navigation }) {
  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }
    return () => {
      setModalVisible(false);
    };
  }, [isFocused]);

  return (
    <View>
      <View style={styles.amout_wrapper}>
        <Text style={styles.currency}>Rs</Text>
        <Text style={styles.ammount}>1575 </Text>
      </View>
      <View>
        <ModalConatiner
          ismodalOpen={modalVisible}
          modalHeight={70}
          navigation={navigation}
          onBackPushToMain={true}
          bulkProps={
            <>
              <View>
                <Text>From: ********56 </Text>
                <Text>Transaction ID: 786433589067 </Text>
                <View style={styles.modalAmount_Wrapper}>
                  <Text style={styles.addedamount}>Rs. 56 </Text>
                  <IconButton icon="check-decagram" color={"green"} size={30} />
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
