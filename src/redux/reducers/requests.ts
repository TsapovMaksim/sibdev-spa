import {
  ADD_REQUEST,
  CHANGE_REQUEST,
  CLEAR_REQUESTS,
  RequestI,
  RequestsActionTypes,
  SET_REQUETS,
} from '../actions/requests';

const initialState: { items: RequestI[] } = {
  items: [],
};

const requests = (state = initialState, action: RequestsActionTypes) => {
  switch (action.type) {
    case SET_REQUETS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_REQUEST:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case CHANGE_REQUEST:
      return {
        ...state,
        items: [...state.items.map((el) => (el.id === action.payload.id ? action.payload : el))],
      };
    case CLEAR_REQUESTS:
      return {};
    default:
      return state;
  }
};

export default requests;
