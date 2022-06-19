import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage } from "../../actions/messageActions";
import { isEmpty } from "../../helper/commpn";

export default function AlertMessage() {
  const dispatch = useDispatch();
  const alertSelecter = useSelector((state) => state.message);
  const { errorMessage } = alertSelecter;

  const onPressOk = () => {
    dispatch(clearErrorMessage());
  };

  const ShowAlert = () => {
    if (!isEmpty(errorMessage)) {
      return (
        <>
          {Alert.alert("Error", `${errorMessage}`, [
            {
              text: "Ok",
              onPress: () => {
                onPressOk();
              },
              style: "cancel",
            },
          ])}
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      {!isEmpty(errorMessage) && <ShowAlert />}
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
