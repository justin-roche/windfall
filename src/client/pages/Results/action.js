/* @flow */
import { Dispatch } from 'redux';
import { ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

export const GET_RESULTS = actionGenerator('@@GET_RESULTS');
export const ADD_RESULTS = actionGenerator('@@ADD_RESULTS');
export const CLEAR_RESULTS = actionGenerator('@@CLEAR_RESULTS');

export const getResultsAction = (skip?: number = 0) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/scrape/results',
      label: GET_RESULTS.NAME,
      params: { skip },
      onSuccess: (res: ApiDataType) => {
        dispatch({ type: GET_RESULTS.SUCCESS, payload: res });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: GET_RESULTS.ERROR, payload: error });
      },
    }),
  );

export const clearResultsAction = () => (dispatch: Dispatch) => {
  console.log('clearing');
  dispatch(
    requestAction({
      url: '/scrape/results',
      label: CLEAR_RESULTS.NAME,
      method: 'DELETE',
      onSuccess: (res: ApiDataType) => {
        dispatch({ type: CLEAR_RESULTS.SUCCESS, payload: res });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: CLEAR_RESULTS.ERROR, payload: error });
      },
    }),
  );
};
export const addResultsAction = (data: Object) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/database/all',
      label: ADD_RESULTS.NAME,
      method: 'POST',
      data,
      onSuccess: ({ data: res }: ApiDataType) => {
        dispatch({ type: ADD_RESULTS.SUCCESS, payload: res });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: ADD_RESULTS.ERROR, payload: error });
      },
    }),
  );
