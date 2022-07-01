import { clearErrorMessage, setErrorMessage } from "../actions/messageActions";
import { getAPIErrorReason, isEmpty } from "../helper/commpn";
import { VEDPAY_API } from "@env";
import axios from "axios";
import { setCardLoader } from "../actions/cardActions";

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

function dispatchCardError(msg, dispatch) {
  dispatch(setErrorMessage(msg));
}
