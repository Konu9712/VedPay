import { clearErrorMessage, setErrorMessage } from "../actions/messageActions";
import { getAPIErrorReason, isEmpty } from "../helper/commpn";
import { VEDPAY_API } from "@env";
import axios from "axios";
import { setCardList, setCardLoader } from "../actions/cardActions";

/**
 * @desc Add Card
 */
export const addCardService = (payload, userId) => async (dispatch) => {
  try {
    dispatch(clearErrorMessage(""));
    if (!userId) return false;
    dispatch(setCardLoader(true));

    if (isEmpty(userId)) {
      dispatchCardError("User is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.cardNumber)) {
      dispatchCardError("Card number is Required", dispatch);
      return false;
    } else if (payload?.cardNumber?.length < 16) {
      dispatchCardError("Card number should be of atleast 16 digits", dispatch);
      return false;
    } else if (isEmpty(payload?.cvv)) {
      dispatchCardError("Cvv is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.expiry)) {
      dispatchCardError("Expiry is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.name)) {
      dispatchCardError("Expiry is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.type)) {
      dispatchCardError("Expiry is Required", dispatch);
      return false;
    }

    const response = await axios.post(
      `${VEDPAY_API}/api/card/${userId}/addCard`,
      payload
    );
    if (response?.data) {
      return true;
    }
  } catch (error) {
    dispatchCardError(
      getAPIErrorReason(error) || "Unable to add Card, please try again",
      dispatch
    );
    return false;
  } finally {
    dispatch(setCardLoader(false));
  }
};

/**
 * @desc Get Card List
 */
export const getCardList = (userId) => async (dispatch) => {
  try {
    dispatch(clearErrorMessage(""));
    if (!userId) return false;
    dispatch(setCardLoader(true));

    if (isEmpty(userId)) {
      dispatchCardError("User is Required", dispatch);
      return false;
    }
    const response = await axios.get(
      `${VEDPAY_API}/api/card/${userId}/cardlList`
    );
    if (response?.data) {
      dispatch(setCardList(response?.data?.cardList));
      return true;
    }
  } catch (error) {
    dispatchCardError(
      getAPIErrorReason(error) || "Unable to fetch Card List, please try again",
      dispatch
    );
    return false;
  } finally {
    dispatch(setCardLoader(false));
  }
};

/**
 * @desc Delete Card
 */
export const deleteCardService = (userId, cardId) => async (dispatch) => {
  try {
    dispatch(clearErrorMessage(""));
    if (!userId || !cardId) return false;
    dispatch(setCardLoader(true));

    const response = await axios.delete(
      `${VEDPAY_API}/api/card/${userId}/deleteCard/${cardId}`
    );
    if (response.data) return true;
    return false;
  } catch (e) {
    dispatchCardError(
      getAPIResponseError(e) || "Unable to delete card, please try again later",
      dispatch
    );
    return false;
  } finally {
    dispatch(setCardLoader(false));
  }
};

function dispatchCardError(msg, dispatch) {
  console.log("msg", msg);
  dispatch(setErrorMessage(msg));
}
