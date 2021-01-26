/* @flow */
import { Dispatch } from 'redux';
import { ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

export const EXECUTE_SCRAPE = actionGenerator('@@EXECUTE_SCRAPE');
export const GET_COMMANDS = actionGenerator('@@GET_COMMANDS');

export const getCommandsAction = () => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/commands',
      label: GET_COMMANDS.NAME,
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: GET_COMMANDS.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: GET_COMMANDS.ERROR, payload: error });
      },
    }),
  );

export const executeScrapeAction = () => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: '/execute',
      label: EXECUTE_SCRAPE.NAME,
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: EXECUTE_SCRAPE.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: EXECUTE_SCRAPE.ERROR, payload: error });
      },
    }),
  );
