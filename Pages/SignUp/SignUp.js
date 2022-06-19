import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Logo from "../../Components/Logo/Logo";
import ModalConatiner from "../../Components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/authActions";
import { signup } from "../../services/authService";
import AlertMessage from "../../Components/Alert/AlertMessage";
import { isEmpty } from "../../helper/commpn";
import Loader from "../../Components/Loader/Loader";

export default function SignUp({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);

  const authSelector = useSelector((state) => state.auth);
  const alertSelecter = useSelector((state) => state.message);
  const { currentUser, loading } = authSelector;
  const { errorMessage } = alertSelecter;

  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }
    return () => {
      setModalVisible(false);
    };
  }, [isFocused]);

  const onChangeInput = useCallback(
    (propsName, value) => {
      dispatch(setCurrentUser({ propsName, value }));
    },
    [dispatch]
  );

  const openPreQrScreenScreen = async () => {
    let result = await dispatch(signup(currentUser));
    if (result) navigation.navigate("PreQrScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Logo style={styles.logo} />
      </View>

      <View style={styles.text_container}>
        <Text style={styles.desc_1}>Welcome Tag line</Text>
        <Text style={styles.desc_2}>Second Quote line</Text>
      </View>
      {loading ? (
        <Loader />
      ) : !isEmpty(errorMessage) ? (
        <AlertMessage />
      ) : (
        <ModalConatiner
          ismodalOpen={modalVisible}
          modalHeight={70}
          navigation={navigation}
          bulkProps={
            <>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.form_wrapper}>
                    <TextInput
                      label="Name"
                      mode="outlined"
                      style={styles.input_}
                      outlineColor="green"
                      activeOutlineColor="green"
                      placeholder="Name"
                      value={currentUser.name}
                      onChangeText={(text) => onChangeInput("name", text)}
                    />

                    <TextInput
                      label="Email"
                      mode="outlined"
                      style={styles.input_}
                      outlineColor="green"
                      activeOutlineColor="green"
                      placeholder="Email"
                      value={currentUser.email}
                      onChangeText={(text) => onChangeInput("email", text)}
                    />

                    <TextInput
                      label="Phone Number"
                      mode="outlined"
                      style={styles.input_}
                      outlineColor="green"
                      activeOutlineColor="green"
                      placeholder="+91"
                      keyboardType="number-pad"
                      value={currentUser.phoneNumber}
                      onChangeText={(text) =>
                        onChangeInput("phoneNumber", text)
                      }
                    />

                    <TextInput
                      label="Password"
                      mode="outlined"
                      style={styles.input_}
                      outlineColor="green"
                      activeOutlineColor="green"
                      placeholder="Password"
                      value={currentUser.password}
                      onChangeText={(text) => onChangeInput("password", text)}
                    />
                  </View>

                  <Button
                    mode="contained"
                    style={styles.btn_getStarted}
                    onPress={() => openPreQrScreenScreen()}
                    color="green"
                  >
                    Get Started
                  </Button>
                </View>
              </View>
            </>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
  btn_getStarted: {
    marginTop: hp("2%"),
  },
});
