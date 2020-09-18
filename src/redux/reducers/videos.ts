import { CLEAR_VIDEOS, SET_VIDEOS, VideosActionTypes } from './../actions/videos';

const initialState = {
  items: [],
  totalResults: 0,
  searchValue: '',
};

const videos = (state = initialState, action: VideosActionTypes) => {
  switch (action.type) {
    case SET_VIDEOS:
      return {
        ...state,
        items: action.payload.items,
        totalResults: action.payload.totalResults,
        searchValue: action.payload.searchValue,
      };
    case CLEAR_VIDEOS:
      return {};
    default:
      return state;
  }
};

export default videos;
