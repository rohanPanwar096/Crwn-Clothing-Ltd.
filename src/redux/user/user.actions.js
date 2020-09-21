import { SET_CURRENT_USER } from "../constants/action-types";

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};
