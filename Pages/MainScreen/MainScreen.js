import * as React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressChart } from "react-native-chart-kit";

export default function MainScreen() {
  const data = {
    labels: ["SBI", "Axis", "ICIC"], // optional
    data: [0.4, 0.6, 0.8],
  };
  const chartConfig = {
    backgroundGradientFrom: "#ffff",
    backgroundGradientTo: "#fff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 2,
    useShadowColorFromDataset: false, // optional
    borderRadius: 15,
  };
  return (
    <View>
      <View style={styles.mainChartWrapper}></View>
      <Card style={styles.card}>
        <ProgressChart
          style={styles.progesBar}
          data={data}
          width={wp("90%")}
          height={hp("30%")}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  mainChartWrapper: {
    paddingTop: hp("10%"),
  },
  progesBar: {
    marginTop: hp("2%"),
  },
  card: {
    backgroundColor: "#ffff",
    height: hp("35"),
    borderRadius: 15,
    marginHorizontal: wp("5%"),
  },
});
