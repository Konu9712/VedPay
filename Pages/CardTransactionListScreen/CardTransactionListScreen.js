import * as React from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card, DataTable, IconButton, Title } from "react-native-paper";
import MasterCardLogo from "../../Components/Logo/MasterCardLogo";

const optionsPerPage = [2, 3, 4];
const d = Dimensions.get("window");
export default function CardTransactionListScreen() {
  let colors = ["#b957f2", "#654321", "#c11381", "#abcdef", "#685f87"];
  const transctionList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable style={styles.main_table}>
      <ScrollView>
        {transctionList.map((item, index) => {
          return (
            <>
              <Card
                key={`Card_Transaction_History_${transctionList}`}
                style={{
                  height: hp("20%"),
                  marginTop: hp("1%"),
                  backgroundColor: colors[index % colors.length],
                  opacity: 0.8,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.cardLogo}>
                    <MasterCardLogo />
                    <Title style={styles.card_no}>*****976</Title>
                  </View>
                  <View style={styles.detail_wrapper}>
                    <Text style={styles.details}>To: +919898564216</Text>
                    <Text style={styles.details}>Transaction Id: LJK7653</Text>
                  </View>
                  <View style={styles.amount_wrapper}>
                    <IconButton icon="check-circle" size={25} color="green" />
                    <Text style={styles.amopunt_desc}>Rs.425</Text>
                  </View>
                </View>
              </Card>
            </>
          );
        })}
      </ScrollView>

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={"Rows per page"}
      />
    </DataTable>
  );
}

const styles = StyleSheet.create({
  main_table: {
    marginTop: hp("5%"),
    marginHorizontal: wp("0.8%"),
  },
  card: {},
  card1: {
    height: hp("20%"),
    marginTop: hp("1%"),
    backgroundColor: "#D6AB80",
    opacity: 0.8,
  },
  card2: {
    height: hp("20%"),
    marginTop: hp("1%"),
    backgroundColor: "#c4d8e2",
    opacity: 0.8,
  },
  cardLogo: {
    marginTop: hp("5%"),
  },
  card_no: {
    marginLeft: wp("5%"),
  },
  detail_wrapper: {
    marginTop: hp("7%"),
    marginLeft: wp("9%"),
  },
  details: {
    fontWeight: "bold",
    fontSize: hp("2.3%"),
  },
  amount_wrapper: {
    marginTop: hp("5%"),
  },
  amopunt_desc: {
    marginTop: hp("0%"),
    marginLeft: wp("4%"),
    fontWeight: "bold",
    fontSize: hp("3.4%"),
    alignSelf: "stretch",
  },
});
