import * as api from "../../api/api";
import { AUTH, FAIL } from "../types";

export const signin = (Formdata, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(Formdata);

    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log("Error in signIn", error.message);
    dispatch({ type: FAIL });
  }
};
export const signup = (Formdata, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(Formdata);

    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log("Error in signIn", error.message);
  }
};
