import { Dispatch } from 'react';

import axios from 'axios';

export const AUTH_USER = 'AUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export interface UserI {
  id: number;
  name: string;
  password: string;
}

interface AuthUserAction {
  type: typeof AUTH_USER;
  payload: UserI;
}
interface LogoutUserAction {
  type: typeof LOGOUT_USER;
  paylod: {};
}

export const fetchUser = (id: number) => (dispatch: Dispatch<AuthActionTypes>) => {
  axios
    .get<UserI[]>(`http://localhost:3001/users?id=${id}`)
    .then(({ data }) => dispatch({ type: AUTH_USER, payload: data[0] }));
};

export const logoutUser = () => (dispath: Dispatch<AuthActionTypes>) => {
  dispath({ type: LOGOUT_USER, paylod: {} });
};

export type AuthActionTypes = AuthUserAction | LogoutUserAction;
