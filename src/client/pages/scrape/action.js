/* @flow */
import { Dispatch } from 'redux';
import { ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

export const GET_SCRAPE = actionGenerator('@@GET_SCRAPE');
export const ADD_RESULTS = actionGenerator('@@ADD_RESULTS');

export const getScrapeAction = (skip?: number = 0) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/scrape/results',
      label: GET_SCRAPE.NAME,
      params: { skip },
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: GET_SCRAPE.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: GET_SCRAPE.ERROR, payload: error });
      },
    }),
  );

export const addResultsAction = (data: Object) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/scrape/results',
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
