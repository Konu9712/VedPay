import * as React from "react";
import { Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const imageUrl =
  "https://cdni.iconscout.com/illustration/premium/thumb/credit-card-security-2600416-2175188.png";

export default function EmptyState() {
  return (
    <>
      <Image source={{ uri: imageUrl }} style={styles.logo} />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: hp("30%"),
    width: wp("60%"),
  },
});
