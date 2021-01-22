/* @flow */
import { Dispatch } from 'redux';
import { ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

export const EXECUTE_SCRAPE = actionGenerator('@@EXECUTE_SCRAPE');

export const executeScrapeAction = () => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/scrape/execute',
      label: EXECUTE_SCRAPE.NAME,
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: EXECUTE_SCRAPE.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: EXECUTE_SCRAPE.ERROR, payload: error });
      },
    }),
  );
