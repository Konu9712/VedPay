import axios from "axios";
import { VEDPAY_API } from "@env";
import { setInLoader } from "../actions/inActions";
import { clearErrorMessage, setErrorMessage } from "../actions/messageActions";
import { getAPIErrorReason, isEmpty } from "../helper/commpn";
import { setOutLoader } from "../actions/outActions";

/**
 * @desc Send Money
 */
export const sendMoney = (userId, payload) => async (dispatch) => {
  try {
    dispatch(clearErrorMessage(""));
    if (!userId) return false;
    dispatch(setOutLoader(true));

    if (isEmpty(userId)) {
      dispatchOutError("User is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.receiverPhoneNumber)) {
      dispatchOutError("Reciver is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.amount)) {
      dispatchOutError("Amount is required", dispatch);
      return false;
    }

    const response = await axios.post(
      `${VEDPAY_API}/api/out/${userId}/outMoney/wallet`,
      payload
    );
    if (response?.data) {
      return true;
    }
  } catch (error) {
    dispatchOutError(
      getAPIErrorReason(error) || "Unable to send money, please try again",
      dispatch
    );
    return false;
  } finally {
    dispatch(setOutLoader(false));
  }
};

function dispatchOutError(msg, dispatch) {
  console.log("msg", msg);
  dispatch(setErrorMessage(msg));
}
