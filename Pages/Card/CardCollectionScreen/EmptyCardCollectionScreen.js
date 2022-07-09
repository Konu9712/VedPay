import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function EmptyCardCollectionScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.mainHeading}>No Cards ! -</Text>
        <Text>Please add cards to your wallet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  mainHeading: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
  },
});
