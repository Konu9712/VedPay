import { clearErrorMessage, setErrorMessage } from "../actions/messageActions";
import { getAPIErrorReason, isEmpty } from "../helper/commpn";
import { VEDPAY_API, STAGING_API } from "@env";
import {
  setAuthLoader,
  setToken,
  updateCurrentUser,
} from "../actions/authActions";
import jwt_decode from "jwt-decode";
import axios from "axios";

/**
 * @desc SignUp User
 */
export const signup = (payload) => async (dispatch) => {
  try {
    dispatch(clearErrorMessage(""));
    dispatch(setAuthLoader(true));
    if (isEmpty(payload?.name)) {
      dispatchAuthError("Name is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.email)) {
      dispatchAuthError("Email is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.phoneNumber)) {
      dispatchAuthError("Phone Number is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.password)) {
      dispatchAuthError("Password is Required", dispatch);
      return false;
    }

    const response = await axios.post(`${VEDPAY_API}/api/auth/signup`, payload);
    if (response?.data) {
      const { message, user } = response?.data;
      var userProfile = jwt_decode(user?.token);
      dispatch(setToken(user?.token));
      dispatch(updateCurrentUser(userProfile));
      return true;
    }
  } catch (error) {
    dispatchAuthError(
      getAPIErrorReason(error) || "Unable to SignUp, please try again",
      dispatch
    );
    return false;
  } finally {
    dispatch(setAuthLoader(false));
  }
};

/**
 * @desc LogIn User
 */
export const login = (payload) => async (dispatch) => {
  try {
    dispatch(clearErrorMessage(""));
    dispatch(setAuthLoader(true));

    if (isEmpty(payload?.phoneNumber)) {
      dispatchAuthError("Phone Number is Required", dispatch);
      return false;
    } else if (isEmpty(payload?.password)) {
      dispatchAuthError("Password is Required", dispatch);
      return false;
    }

    const response = await axios.post(`${VEDPAY_API}/api/auth/login`, payload);
    if (response?.data) {
      const { message, user } = response?.data;
      var userProfile = jwt_decode(user?.token);
      dispatch(setToken(user?.token));
      dispatch(updateCurrentUser(userProfile));
      return true;
    }
  } catch (error) {
    dispatchAuthError(
      getAPIErrorReason(error) || "Unable to LogIn, please try again",
      dispatch
    );
    return false;
  } finally {
    dispatch(setAuthLoader(false));
  }
};

function dispatchAuthError(msg, dispatch) {
  dispatch(setErrorMessage(msg));
}
