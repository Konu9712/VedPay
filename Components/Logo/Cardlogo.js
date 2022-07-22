import * as React from "react";
import { Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const imageUrl =
  "https://www.goodfreephotos.com/albums/vector-images/credit-card-vector-graphics.png";

export default function Cardlogo() {
  return (
    <>
      <Image source={{ uri: imageUrl }} style={styles.logo} />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: hp("10%"),
    width: wp("20%"),
  },
});
