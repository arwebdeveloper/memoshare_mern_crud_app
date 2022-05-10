import { AUTH, LOG_OUT } from "../constants";

const initialState = { authData: null };
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
        localStorage.setItem('profile', JSON.stringify({...action?.data}));
      return { ...state, authData: action?.data };
    case LOG_OUT:
        localStorage.clear();
      return { ...state, authData: null };;
    default:
      return state;
  }
};
