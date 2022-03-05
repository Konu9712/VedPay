import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Divider() {
  return (
    <View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginTop: hp("1%"),
  },
});
