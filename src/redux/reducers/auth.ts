import { AuthActionTypes, AUTH_USER, LOGOUT_USER } from './../actions/auth';

const initialState = {};

const auth = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...action.payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export default auth;
