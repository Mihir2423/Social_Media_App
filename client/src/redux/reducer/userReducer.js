import {
  GET_ALL_USER,
} from "../types";

const UserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return action.payload;

    default:
      return state;
  }
};
export default UserReducer;
