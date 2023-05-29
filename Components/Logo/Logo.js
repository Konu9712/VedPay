import * as React from "react";
import { Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Logo() {
  return (
    <>
      <Image
        source={require("../../assets/icon_png.png")}
        style={styles.logo}
      />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: hp("5%"),
    width: wp("40%"),
  },
});
