import React, { useState, useEffect, useCallback } from "react";
import * as Contacts from "expo-contacts";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Avatar, IconButton, TouchableRipple, Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModalConatiner from "../../Components/Modal/Modal";

export default function OutMainScreen() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  }, []);

  const renderContacts = ({ item, index }) => {
    const avatarInitial = item?.name?.substring(0, 2);
    let phoneNumber = item?.phoneNumbers?.number;
    if (
      typeof item?.phoneNumbers == "object" &&
      item?.phoneNumbers[0]?.number
    ) {
      phoneNumber = item?.phoneNumbers[0]?.number;
    }

    return (
      <>
        {phoneNumber && (
          <TouchableRipple
            rippleColor="rgba(0, 0, 0, .32)"
            style={styles.rippleContainer}
            borderless={true}
            onPress={() => console.log("Pressed")}
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
        <Text style={styles.currency}>Rs</Text>
        <Text style={styles.ammount}>1572 </Text>
      </View>
      <View style={styles.modalContainer}>
        <ModalConatiner
          modalHeight={90}
          bulkProps={
            <>
              <TouchableRipple
                rippleColor="rgba(0, 0, 0, .32)"
                style={styles.rippleContainer}
                borderless={true}
                onPress={() => console.log("Pressed")}
              >
                <FlatList data={contacts} renderItem={renderContacts} />
              </TouchableRipple>
            </>
          }
        />
      </View>
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
    fontSize: hp("3%"),
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
});
