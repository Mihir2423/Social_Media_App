import { AUTH, LOGOUT, FAIL, FOLLOW_USER, UNFOLLOW_USER } from "../types";

const authReducer = (state = { authData: null, errors: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

      return { ...state, authData: action.payload, errors: false };
    case FAIL:
      return { ...state, errors: true };

    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, errors: false };
    case FOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          oldUser: {
            ...state.authData.oldUser,
            following: [...state.authData.oldUser.following, action.payload],
          },
        },
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          oldUser: {
            ...state.authData.oldUser,
            following: state.authData.oldUser.following?.filter((personId)=>personId!==action.payload),
          },
        },
      };
    default:
      return state;
  }
};

export default authReducer;
