import { GET_ALL_USER, FOLLOW_USER, UNFOLLOW_USER, GET_CURR_USER } from "../types";
import { allUsers, getUser, followUser, unfollowUser } from "../../api/api";

export const getAllUserAction = () => async (dispatch) => {
  try {
    const { data } = await allUsers();
    dispatch({ type: GET_ALL_USER, payload: data });
  } catch (error) {
    console.log("Error in signIn", error.message);
  }
};

export const followUserAction = (id, userId) => async (dispatch) => {
  try {
    await followUser(id, userId);
    dispatch({ type: FOLLOW_USER, payload: id });

  } catch (error) {
    console.log("Error in following :", error.message);
  }
}
export const unfollowUserAction = (id, userId) => async (dispatch) => {
  try {
    await unfollowUser(id, userId);
    dispatch({ type: UNFOLLOW_USER, payload: id });

  } catch (error) {
    console.log("Error in unfollowing :", error.message);
  }
}

export const getCurrentUser = (id) => async(dispatch) => {
  try {
    const {data} = await getUser(id)
    dispatch({ type: GET_CURR_USER, payload: data });

  } catch (error) {
    console.log("Error in getting current User :", error.message);
  }
}