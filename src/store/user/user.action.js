import { createAction } from "../../utils/reducer/reducer.utils";
import USER_ACTION_TYPES from "./user.types";

export const setCurrentUser = (user) => {
  // dispatch( {type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
  // return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user };
};
 