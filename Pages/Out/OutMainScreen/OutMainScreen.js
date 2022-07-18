import React, { useState, useEffect, useCallback } from "react";
import * as Contacts from "expo-contacts";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Avatar, IconButton, TouchableRipple, Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../../Components/Modal/Modal";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "../../../actions/authActions";
import { getData } from "../../../services/localStorageService";
import { getTotalBalance } from "../../../services/authService";
import Loader from "../../../Components/Loader/Loader";
import { isEmpty } from "../../../helper/commpn";
import AlertMessage from "../../../Components/Alert/AlertMessage";
import EmptyContactState from "./EmptyContactState";
import { setSelectedContact } from "../../../actions/outActions";

export default function OutMainScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);

  const authSelector = useSelector((state) => state.auth);

  const alertSelecter = useSelector((state) => state.message);

  const { vedPayUsers, totalBalance, loading } = authSelector;
  const { errorMessage } = alertSelecter;

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
      loadContacts();
      loadData();
    }
    return () => {
      setModalVisible(false);
    };
  }, [isFocused]);

  const loadData = async () => {
    const userProfile = await dispatch(getData("userProfile"));
    const result = await dispatch(getTotalBalance(userProfile?.userId));
  };

  const loadContacts = useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        dispatch(setContacts(data));
      }
    } else navigation.navigate("Main");
  }, []);

  const openOutContactChatScreen = (item) => {
    if (item) {
      dispatch(setSelectedContact(item));
      navigation.navigate("OutContactChatScreen");
    }
  };

  const renderContacts = ({ item, index }) => {
    const avatarInitial = item?.name?.substring(0, 2);
    let phoneNumber = item?.phoneNumber;

    return (
      <>
        {phoneNumber && (
          <TouchableRipple
            rippleColor="rgba(0, 0, 0, .32)"
            style={styles.rippleContainer}
            borderless={true}
            onPress={() => openOutContactChatScreen(item)}
          >
            <View style={styles.contactContainer}>
              <Avatar.Text size={50} label={avatarInitial} />
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{item?.name}</Text>
                <Text>{phoneNumber}</Text>
              </View>
              <IconButton
                icon="share"
                color={"green"}
                size={30}
                style={styles.share_Icon}
              />
            </View>
          </TouchableRipple>
        )}
      </>
    );
  };

  return (
    <View>
      <View style={styles.amout_wrapper}>
        <Text style={styles.currency}>₹</Text>
        <Text style={styles.ammount}>{totalBalance} </Text>
      </View>
      {loading ? (
        <Loader />
      ) : !isEmpty(errorMessage) ? (
        <>
          <AlertMessage />
        </>
      ) : (
        <View style={styles.modalContainer}>
          <ModalConatiner
            ismodalOpen={modalVisible}
            modalHeight={90}
            navigation={navigation}
            bulkProps={
              <View>
                {isEmpty(vedPayUsers) ? (
                  <>
                    <View style={styles.emptyStateContainer}>
                      <EmptyContactState />
                    </View>
                  </>
                ) : (
                  <FlatList
                    data={vedPayUsers}
                    renderItem={renderContacts}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  amout_wrapper: {
    marginTop: hp("10%"),
    marginHorizontal: wp("15%"),
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  currency: {
    fontWeight: "bold",
    fontSize: hp("4%"),
    color: "#ffff",
  },
  ammount: {
    fontWeight: "bold",
    fontSize: hp("6%"),
    color: "#ffff",
  },
  rippleContainer: {
    borderRadius: 30,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: "1%",
  },
  contactDetails: {
    marginLeft: wp("5%"),
  },
  contactName: {
    fontWeight: "bold",
    fontSize: hp("2.5%"),
  },
  share_Icon: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyStateContainer: {
    height: hp("50%"),
  },
});
