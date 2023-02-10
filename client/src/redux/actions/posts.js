import { CREATE_POST, GET_TIMELINE_POST } from "../types";
import { createpost, timeLinePost } from "../../api/api";

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await createpost(post);
    console.log(data);
    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log("Error in calling CreatePost API : ", error.message);
  }
};

export const getTimeLinePost = (id) => async (dispatch) => {
  try {
    const { data } = await timeLinePost(id);
    dispatch({ type: GET_TIMELINE_POST, payload: data });
  } catch (error) {
    console.log("Error in calling CreatePost API : ", error.message);
  }
};

