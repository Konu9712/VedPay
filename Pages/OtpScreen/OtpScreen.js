import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Logo from "../../Components/Logo/Logo";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Button } from "react-native-paper";

const CELL_COUNT = 4;

const OtpScreen = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logo_container}>
        <Logo style={styles.logo} />
      </View>

      <View style={styles.text_container}>
        <Text style={styles.desc_1}>Mobile Verification</Text>
        <Text style={styles.desc_2}>We have send you</Text>
        <Text style={styles.desc_2}>an OTP on +91 98XXXXXX01</Text>
      </View>

      <View style={styles.otp_container}>
        <SafeAreaView style={styles.root}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
      </View>

      <View style={styles.resend_container}>
        <Text style={styles.resend_desc}>If you didn't receive a code !</Text>
        <Text style={styles.resend_text}> Resend</Text>
      </View>

      <View style={styles.verify_btn_container}>
        <Button
          mode="contained"
          style={styles.verify_btn}
          onPress={() => console.log("verify")}
          color="green"
        >
          Verify
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo_container: {
    margin: "3%",
    marginTop: hp("5%"),
  },
  text_container: {
    marginTop: hp("5%"),
    marginHorizontal: "4%",
  },
  desc_1: {
    fontWeight: "bold",
    fontSize: hp("3%"),
    color: "#ffff",
  },
  desc_2: {
    fontSize: hp("3%"),
    color: "#ffff",
  },
  root: { padding: 20, minHeight: 140 },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: 50,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 3,
    borderBottomColor: "green",
  },
  cellText: {
    color: "#fff",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
  },
  resend_container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  resend_desc: {
    color: "#fff",
  },
  resend_text: {
    color: "green",
  },
  verify_btn_container: {
    marginTop: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  verify_btn: {
    width: wp("50%"),
  },
});

export default OtpScreen;
