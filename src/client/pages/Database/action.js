/* @flow */
import { Dispatch } from 'redux';
import { ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

export const GET_DATABASE = actionGenerator('@@GET_DATABASE');
export const ADD_RESULTS = actionGenerator('@@ADD_RESULTS');

export const getDatabaseAction = (skip?: number = 0) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/database/all',
      label: GET_DATABASE.NAME,
      params: { skip },
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: GET_DATABASE.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: GET_DATABASE.ERROR, payload: error });
      },
    }),
  );
