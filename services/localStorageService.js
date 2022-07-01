import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = (key, value) => async (dispatch) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    dispatchLocalError("Error in Local Storage Saving ", dispatch);
  }
};

export const getData = (key) => async (dispatch) => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value !== null) {
      value = JSON.parse(value);
      return value;
    }
  } catch (e) {
    dispatchLocalError("Error in Local Storage Retriving ", dispatch);
    return false;
  }
};

function dispatchLocalError(msg, dispatch) {
  dispatch(setErrorMessage(msg));
}
