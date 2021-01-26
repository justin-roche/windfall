import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import database from 'pages/Database/reducer';
import execute from 'pages/Execute/reducer';
import scrape from 'pages/Results/reducer';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
/* @flow */
import {
  ActionType,
  GlobalStateType,
} from 'types';

import {
  GET_ME,
  UPDATE_LOADING,
  UPDATE_THEME,
  UPDATE_TOKEN,
} from './action';

const initialState: GlobalStateType = {
  isLoading: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  theme: 'light',
};

const global = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case UPDATE_TOKEN: {
      let s = {
        ...state,
        ...action.payload,
      };

      if (!s.accessToken) {
        s = { ...s, user: null };
      }

      return s;
    }
    case UPDATE_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case UPDATE_THEME: {
      return { ...state, theme: action.payload };
    }
    case GET_ME.SUCCESS: {
      return { ...state, user: action.payload };
    }
    case GET_ME.ERROR: {
      return { ...state, user: null };
    }
    default:
      return { ...state };
  }
};

const createReducers = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    form,
    global,
    scrape,
    execute,
    database,
  });

export default createReducers;
