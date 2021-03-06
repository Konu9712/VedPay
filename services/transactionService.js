import axios from "axios";
import { VEDPAY_API } from "@env";
import { clearErrorMessage, setErrorMessage } from "../actions/messageActions";
import { getAPIErrorReason, isEmpty } from "../helper/commpn";
import {
  setCardTransaction,
  setContactTransaction,
  setGlobalTransaction,
  setTransactionLoader,
} from "../actions/transactionActions";

/**
 * @desc Get Hstory between user and Contact
 */
export const getContactTransactionHistory =
  (userId, contactNumber) => async (dispatch) => {
    try {
      dispatch(clearErrorMessage(""));
      if (!userId) return false;
      dispatch(setTransactionLoader(true));

      if (isEmpty(userId)) {
        dispatchTransactionError("User is Required", dispatch);
        return false;
      }
      const response = await axios.get(
        `${VEDPAY_API}/api/transaction/${userId}/contact/${contactNumber}`
      );
      if (response?.data) {
        dispatch(setContactTransaction(response?.data?.transactionHistory));
        return true;
      }
    } catch (error) {
      dispatchTransactionError(
        getAPIErrorReason(error) || "Unable to fetch History, please try again",
        dispatch
      );
      return false;
    } finally {
      dispatch(setTransactionLoader(false));
    }
  };

/**
 * @desc Get global Hstory transaction
 */
export const getGlobalTransactionHistory = (userId) => async (dispatch) => {
  try {
    dispatch(clearErrorMessage(""));
    if (!userId) return false;
    dispatch(setTransactionLoader(true));

    if (isEmpty(userId)) {
      dispatchTransactionError("User is Required", dispatch);
      return false;
    }
    const response = await axios.get(
      `${VEDPAY_API}/api/transaction/${userId}/global`
    );
    if (response?.data) {
      dispatch(setGlobalTransaction(response?.data?.transactionHistory));
      return true;
    }
  } catch (error) {
    dispatchTransactionError(
      getAPIErrorReason(error) || "Unable to fetch History, please try again",
      dispatch
    );
    return false;
  } finally {
    dispatch(setTransactionLoader(false));
  }
};

/**
 * @desc Get Card Hstory transaction
 */
export const getCardTransactionHistory =
  (userId, cardId) => async (dispatch) => {
    try {
      dispatch(clearErrorMessage(""));
      if (!userId) return false;
      dispatch(setTransactionLoader(true));

      if (isEmpty(userId)) {
        dispatchTransactionError("User is Required", dispatch);
        return false;
      }
      if (isEmpty(cardId)) {
        dispatchTransactionError("Card is Required", dispatch);
        return false;
      }

      const response = await axios.get(
        `${VEDPAY_API}/api/transaction/${userId}/card/${cardId}`
      );
      if (response?.data) {
        dispatch(setCardTransaction(response?.data?.cardHistory));
        return true;
      }
    } catch (error) {
      dispatchTransactionError(
        getAPIErrorReason(error) || "Unable to fetch History, please try again",
        dispatch
      );
      return false;
    } finally {
      dispatch(setTransactionLoader(false));
    }
  };
function dispatchTransactionError(msg, dispatch) {
  console.log("msg", msg);
  dispatch(setErrorMessage(msg));
}
