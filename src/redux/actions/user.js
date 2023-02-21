import { server } from "../store";
import axios from "axios";
import { storageKeys } from "../../constants/storageKeys";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },

        withCredentials: true,
      }
    );
    localStorage.setItem(storageKeys.USER_DATA, JSON.stringify(data.user));
    localStorage.setItem(storageKeys.IS_AUTHEND, true);

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const register = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(`${server}/register`, formdata, {
      headers: {
        "Content-type": "multipart/form-data",
      },

      withCredentials: true,
    });

    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    localStorage.setItem(storageKeys.USER_DATA, JSON.stringify(data.user));
    localStorage.setItem(storageKeys.IS_AUTHEND, true);
    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    localStorage.removeItem(storageKeys.USER_DATA);
    localStorage.removeItem(storageKeys.IS_AUTHEND);
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error?.response?.data?.message });
  }
};

export const momopayment = (idUser) => async (dispatch) => {
  try {
    dispatch({ type: "momopayment" });

    const response = await axios.get(`${server}/pay/momo/${idUser}`, {
      withCredentials: true,
    });
    window.open(response?.data);
  } catch (error) {
    dispatch({
      type: "momofaild",
      payload: error.response.data.message,
    });
  }
};

export const vnpayment = (idUser) => async (dispatch) => {
  try {
    dispatch({ type: "vnpayment" });
    const response = await axios.get(`${server}/pay/vnpay/${idUser}`);
    window.open(response?.data);
  } catch (error) {
    dispatch({
      type: "vnpayfaild",
      payload: error.response.data.message,
    });
  }
};

export const buySubscription = () => async (dispatch) => {
  try {
    dispatch({ type: "buySubscriptionRequest" });

    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });

    dispatch({ type: "buySubscriptionSuccess", payload: data.subscriptionId });
  } catch (error) {
    dispatch({
      type: "buySubscriptionFail",
      payload: error.response.data.message,
    });
  }
};

export const cancelSubscription = () => async (dispatch) => {
  try {
    dispatch({ type: "cancelSubscriptionRequest" });

    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });

    dispatch({ type: "cancelSubscriptionSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "cancelSubscriptionFail",
      payload: error.response.data.message,
    });
  }
};
