import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressChart } from "react-native-chart-kit";

export default function MainScreen({ navigation }) {
  const openCardCollectionScreen = () => {
    navigation.navigate("Card", { screen: "CardCollectionScreen" });
  };

  const openHistoryMainScreen = () => {
    navigation.navigate("HistoryMainScreen");
  };

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
      <View style={styles.mainChartWrapper}>
        <Card style={styles.progressChartCard}>
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
      <View style={styles.iconCardWrapper}>
        <Card style={styles.historyCard}>
          <View style={styles.iconWrapper}>
            <IconButton
              icon="cards"
              color="#ff6c2f"
              size={30}
              onPress={() => openCardCollectionScreen()}
              // style={styles.share_Icon}
            />
            <IconButton
              icon="history"
              color="#ff6c2f"
              size={30}
              onPress={() => openHistoryMainScreen()}
              // style={styles.share_Icon}
            />
            <IconButton
              icon="hand"
              color="#ff6c2f"
              size={30}
              // style={styles.share_Icon}
            />
          </View>
        </Card>
      </View>
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
  progressChartCard: {
    backgroundColor: "#ffff",
    height: hp("35"),
    borderRadius: 15,
    marginHorizontal: wp("5%"),
  },
  iconCardWrapper: {
    paddingTop: hp("5%"),
  },
  iconWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
  },
  historyCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    height: hp("10"),
    borderRadius: 15,
    marginHorizontal: wp("5%"),
  },
});
