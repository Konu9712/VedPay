import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackHandler } from "react-native-web";

export default function ModalConatiner({
  bulkProps,
  modalHeight,
  ismodalOpen,
  navigation,
}) {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    setModalVisible(ismodalOpen);
  }, [ismodalOpen]);

  return (
    <View style={styles.container}>
      <View style={styles.modal_conatiner}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            if (navigation.goBack()) {
              navigation.goBack();
            }
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { height: hp(`${modalHeight}`) }]}>
              {bulkProps}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: wp("95%"),
    height: hp("70%"),
    marginTop: hp("30%"),
    padding: "8%",
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 9,
  },
});
