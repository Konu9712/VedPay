import * as React from "react";
import { Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const imageUrl =
  "https://pngimage.net/wp-content/uploads/2018/06/upi-logo-png-4.png";

export default function UpiLogo() {
  return (
    <>
      <Image source={{ uri: imageUrl }} style={styles.logo} />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: hp("5%"),
    width: wp("30"),
  },
});
