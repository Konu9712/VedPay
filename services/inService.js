import axios from "axios";
import { VEDPAY_API } from "@env";
import { setInLoader } from "../actions/inActions";
import { clearErrorMessage, setErrorMessage } from "../actions/messageActions";
import { getAPIErrorReason, isEmpty } from "../helper/commpn";
import {
  setTransactionDetails,
  setTransactionLoader,
} from "../actions/transactionActions";

/**
 * @desc Add Money
 */
export const addMoney = (userId, cardId, payload) => async (dispatch) => {
  try {
    dispatch(clearErrorMessage(""));
    if (!userId) return false;
    dispatch(setInLoader(true));
    dispatch(setTransactionLoader(true));

    if (isEmpty(userId)) {
      dispatchInError("User is Required", dispatch);
      return false;
    } else if (isEmpty(cardId)) {
      dispatchInError("Card is Required", dispatch);
      return false;
    } else if (isEmpty(payload)) {
      dispatchInError("Amount is required", dispatch);
      return false;
    }

    const response = await axios.post(
      `${VEDPAY_API}/api/in/${userId}/inMoney/${cardId}`,
      payload
    );
    if (response?.data) {
      dispatch(setTransactionDetails(response?.data?.result));
      return true;
    }
  } catch (error) {
    dispatchInError(
      getAPIErrorReason(error) ||
        "Unable to add money in your wallet, please try again",
      dispatch
    );
    return false;
  } finally {
    dispatch(setInLoader(false));
    dispatch(setTransactionLoader(false));
  }
};

function dispatchInError(msg, dispatch) {
  console.log("msg", msg);
  dispatch(setErrorMessage(msg));
}
