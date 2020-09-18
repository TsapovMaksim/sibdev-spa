import { Dispatch } from 'react';
import axios from 'axios';

export const SET_VIDEOS = 'SET_VIDEOS';
export const CLEAR_VIDEOS = 'CLEAR_VIDEOS';

export interface VideoI {
  description: string;
  title: string;
  thumbnails: ThumbnailsI;
  id: string;
}

interface ThumbnailsI {
  default: { url: string; height: number; width: number };
  high: { url: string; height: number; width: number };
  medium: { url: string; height: number; width: number };
}

export interface VideosPayloadI {
  totalResults: number;
  items: VideoI[];
  searchValue: string;
}

interface SetVideosAction {
  type: typeof SET_VIDEOS;
  payload: VideosPayloadI;
}

interface ClearVideosAction {
  type: typeof CLEAR_VIDEOS;
  payload: VideoI[];
}

interface SnippetI {
  description: string;
  title: string;
  thumbnails: ThumbnailsI;
}

export type orderTypes = 'date' | 'rating' | 'relevence' | 'title' | 'viewCount';

export const fetchVideos = (
  searchValue: string,
  maxResulst: number = 12,
  order: orderTypes = 'relevence',
) => (dispatch: Dispatch<VideosActionTypes>) => {
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?q=${searchValue}&part=snippet&maxResults=${maxResulst}${
        order === 'relevence' ? '' : `&order${order}`
      }&key=AIzaSyBUfbE4PPdvPYnh4oEbMpZ_0OjyZ-n_avc`,
    )
    .then((response: any) => {
      console.log(response);

      dispatch({
        type: SET_VIDEOS,
        payload: {
          items: response.data.items.map(
            ({ id, snippet }: { snippet: SnippetI; id: { videoId: string } }) => ({
              id: id.videoId,
              title: snippet.title,
              description: snippet.description,
              thumbnails: snippet.thumbnails,
            }),
          ),
          totalResults: response.data.pageInfo.totalResults,
          searchValue: searchValue,
        },
      });
    })
    .catch((reason) => console.log(reason));
};

export const clearVideos = () => (dispatch: Dispatch<VideosActionTypes>) => {
  dispatch({ type: CLEAR_VIDEOS, payload: [] });
};

export type VideosActionTypes = SetVideosAction | ClearVideosAction;
