/* @flow */
import { Dispatch } from 'redux';
import { ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

export const GET_SCRAPE = actionGenerator('@@GET_SCRAPE');

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
