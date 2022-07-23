import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../services/localStorageService";
import { getVedpayUsers } from "../../services/authService";
import { getCardStats } from "../../services/cardService";
import EmptyState from "../../Components/Logo/EmptyState";
import { isEmpty } from "../../helper/commpn";

export default function MainScreen({ navigation }) {
  const dispatch = useDispatch();

  const authSelector = useSelector((state) => state.auth);
  const cardSelector = useSelector((state) => state.card);

  const { allContacts } = authSelector;
  const { cardStats } = cardSelector;

  useEffect(() => {
    loadVedpayUsers();
  }, []);

  const loadVedpayUsers = async () => {
    const userProfile = await dispatch(getData("userProfile"));
    const result = dispatch(getVedpayUsers(userProfile?.userId, allContacts));
    const cardStats = await dispatch(getCardStats(userProfile?.userId));
  };

  const openCardCollectionScreen = () => {
    navigation.navigate("Card", { screen: "CardCollectionScreen" });
  };

  const openHistoryMainScreen = () => {
    navigation.navigate("HistoryMainScreen");
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
          {!isEmpty(cardStats?.data) ? (
            <ProgressChart
              style={styles.progesBar}
              data={cardStats}
              width={wp("90%")}
              height={hp("30%")}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          ) : (
            <>
              <View>
                <View style={styles.emptyStateWrapper}>
                  <View style={styles.imageWrapper}>
                    <EmptyState height={10} />
                  </View>
                  <Text style={styles.emptyText}>
                    No card transaactions ! --
                  </Text>
                </View>
              </View>
            </>
          )}
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
  emptyStateWrapper: {
    alignItems: "center",
  },
  emptyText: {
    fontWeight: "bold",
    fontSize: hp("2.5%"),
  },
});
