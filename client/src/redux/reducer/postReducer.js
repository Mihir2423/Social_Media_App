import { CREATE_POST, GET_TIMELINE_POST,  } from "../types";

const PostReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_POST:
      return [action.payload, ...state];
    case GET_TIMELINE_POST:
      return action.payload;
    default:
      return state;
  }
};

export default PostReducer;
