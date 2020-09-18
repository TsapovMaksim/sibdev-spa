import { combineReducers } from 'redux';

import auth from './auth';
import videos from './videos';
import requests from './requests';

const rootReducer = combineReducers({ auth, videos, requests });

export default rootReducer;
