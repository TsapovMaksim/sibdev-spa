import { Dispatch } from 'react';
import axios from 'axios';
import { orderTypes } from './videos';

export const SET_REQUETS = 'SET_REQUEST';
export const ADD_REQUEST = 'ADD_REQUEST';
export const CHANGE_REQUEST = 'CHANGE_REQUEST';
export const CLEAR_REQUESTS = 'CLEAR_REQUESTS';

export interface RequestI {
  requestValue: string;
  requestName: string;
  sortBy: orderTypes;
  totalCount: number;
  userId: number;
  id?: number;
}

interface SetRequestsAction {
  type: typeof SET_REQUETS;
  payload: RequestI[];
}

interface AddRequestAction {
  type: typeof ADD_REQUEST;
  payload: RequestI;
}

interface ChangeRequestAction {
  type: typeof CHANGE_REQUEST;
  payload: RequestI;
}

interface ClearRequestsAction {
  type: typeof CLEAR_REQUESTS;
  payload: RequestI[];
}

export type RequestsActionTypes =
  | SetRequestsAction
  | AddRequestAction
  | ChangeRequestAction
  | ClearRequestsAction;

export const fetchRequests = (userId: number) => (dispatch: Dispatch<RequestsActionTypes>) => {
  axios
    .get<RequestI[]>(`http://localhost:3001/favorites?userId=${userId}`)
    .then(({ data }) => dispatch({ type: SET_REQUETS, payload: data }));
};

export const saveRequest = (data: RequestI) => (dispatch: Dispatch<RequestsActionTypes>) => {
  axios
    .post('http://localhost:3001/favorites', data)
    .then(({ data }) => dispatch({ type: ADD_REQUEST, payload: data }));
};

export const changeRequest = (data: RequestI) => (dispatch: Dispatch<RequestsActionTypes>) => {
  axios
    .put('http://localhost:3001/favorites/' + data.id, data)
    .then(({ data }) => dispatch({ type: CHANGE_REQUEST, payload: data }));
};

export const clearRequests = () => (dispatch: Dispatch<RequestsActionTypes>) => {
  dispatch({ type: CLEAR_REQUESTS, payload: [] });
};
