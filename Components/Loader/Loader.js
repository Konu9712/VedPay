import * as React from "react";
import { View, StyleSheet } from "react-native";
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
