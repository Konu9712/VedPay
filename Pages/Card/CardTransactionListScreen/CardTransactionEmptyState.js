import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import EmptyState from "../../../Components/Logo/EmptyState";

export default function CardTransactionEmptyState({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <EmptyState />
        <Text style={styles.mainHeading}>
          No Transaction Listed on this Card ! --
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp("50%"),
    width: wp("100%"),
  },
  mainHeading: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: "white",
  },
});
