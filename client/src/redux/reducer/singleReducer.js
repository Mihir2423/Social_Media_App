import {
    GET_CURR_USER,
  } from "../types";
  
  const SingleReducer = (state = [], action) => {
    switch (action.type) {
      case GET_CURR_USER:
        return action.payload;
  
      default:
        return state;
    }
  };
  export default SingleReducer;
  