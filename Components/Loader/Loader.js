import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Grid } from "react-native-animated-spinkit";

export default function Loader() {
  return (
    <View style={styles.container}>
      <Grid size={48} color="green" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp("45%"),
    marginVertical: hp("30%"),
  },
});
