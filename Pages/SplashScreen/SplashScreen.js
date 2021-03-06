import React, { useState, useEffect, useCallback } from "react";
import * as Contacts from "expo-contacts";
import { Text, View, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "../../actions/authActions";
import { getVedpayUsers } from "../../services/authService";
import { getData } from "../../services/localStorageService";

export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();

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
        await dispatch(setContacts(data));
      }
    }
  }, []);

  const openSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  const openLogIn = () => {
    navigation.navigate("LogIn");
  };

  return (
    <View>
      <View style={styles.header_wrapper}>
        <Image
          source={require("../../assets/icon_png.png")}
          style={styles.header}
        />
      </View>

      <View style={styles.text_wrapper}>
        <Text style={styles.text_header}>
          Keep your all cards in One place{" "}
        </Text>
        <Text style={styles.desc_1}>Make every payments with the</Text>
        <Text style={styles.desc_2}>safest way possible</Text>
      </View>

      <View style={styles.btn_wrapper}>
        <Button
          mode="contained"
          style={styles.btn_getStarted}
          color="green"
          onPress={() => openSignUpScreen()}
        >
          Get Started
        </Button>

        <Button
          mode="outlined"
          style={styles.btn_lonIn}
          color="green"
          onPress={() => openLogIn()}
          dark={0}
        >
          LogIn
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '',
    // padding: 8,
  },
  header: {
    height: hp("5%"),
    width: wp("30%"),
    marginTop: hp("20"),
    marginLeft: wp("35"),
  },
  text_wrapper: {
    marginTop: hp("15"),
    marginLeft: wp("20"),
  },
  text_header: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: "white",
  },
  desc_1: {
    fontSize: hp("2.4%"),
    marginTop: wp("1%"),
    color: "white",
  },
  desc_2: {
    fontSize: hp("2.4%"),
    marginLeft: wp("10%"),
    color: "white",
  },
  btn_wrapper: {
    marginTop: hp("25%"),
    marginLeft: wp("10%"),
    marginRight: wp("10%"),
  },
  btn_getStarted: {},
  btn_lonIn: {
    marginTop: hp("2%"),
    borderColor: "green",
  },
});
