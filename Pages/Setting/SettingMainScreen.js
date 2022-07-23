import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Button, IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../actions/authActions";
import AlertMessage from "../../Components/Alert/AlertMessage";
import ModalConatiner from "../../Components/Modal/Modal";
import { getData } from "../../services/localStorageService";

export default function SettingMainScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(true);
  const [user, setUser] = useState();

  const alertSelecter = useSelector((state) => state.message);

  const { errorMessage } = alertSelecter;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const userProfile = await dispatch(getData("userProfile"));
    setUser(userProfile);
  };

  const logout = () => {
    const payload = {
      phoneNumber: "",
      password: "",
    };
    dispatch(updateCurrentUser(payload));
  };

  return (
    <View>
      <View style={styles.contact_Container}>
        <Avatar.Text
          size={50}
          label={user?.name?.substring(0, 2)}
          style={styles.contactAvatar}
        />
        <Text style={styles.contactName}>{user?.name} </Text>
      </View>

      <View style={styles.modal_wrapper}>
        <ModalConatiner
          ismodalOpen={modalVisible}
          modalHeight={90}
          navigation={navigation}
          bulkProps={
            <>
              <View style={styles.settingContainer}>
                <IconButton icon="settings" size={100} />
                <Text style={styles.desc_1}> Comming Soon ! --</Text>
                <Button
                  mode="contained"
                  style={styles.logout_btn}
                  onPress={() => logout()}
                  color="red"
                >
                  Log out
                </Button>
              </View>
            </>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contact_Container: {
    marginTop: hp("5%"),
    marginLeft: wp("10%"),
    flexDirection: "row",
    alignItems: "center",
  },
  contactAvatar: {
    backgroundColor: "green",
  },
  contactName: {
    fontWeight: "bold",
    fontSize: hp("3%"),
    color: "#ffff",
    marginLeft: wp("2%"),
  },
  settingContainer: {
    alignItems: "center",
  },
  desc_1: {
    fontWeight: "bold",
    fontSize: wp("5%"),
  },
  logout_btn: {
    marginTop: hp("3%"),
  },
});
