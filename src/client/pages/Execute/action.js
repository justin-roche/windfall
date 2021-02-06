/* @flow */
import { Dispatch } from 'redux';
import { ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

import io from 'socket.io-client';
export const EXECUTE_SCRAPE = actionGenerator('@@EXECUTE_SCRAPE');
export const GET_COMMANDS = actionGenerator('@@GET_COMMANDS');

export const LISTEN_ON_PROGRESS_SOCKET = actionGenerator(
  '@@LISTEN_ON_PROGRESS_SOCKET',
);

export const listenForProgressAction = (skip?: number = 0) => (
  dispatch: Dispatch,
) => {
  let socket = io.connect('http://192.168.1.186:8081');
  console.log(socket);
  socket.on('progress', function (data) {
    console.log('got progress', data);
    dispatch({ type: LISTEN_ON_PROGRESS_SOCKET.SUCCESS, payload: data });
  });
};

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

export const executeScrapeAction = (data) => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      noLoad: true,
      url: '/execute',
      method: 'POST',
      data,
      label: EXECUTE_SCRAPE.NAME,
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: EXECUTE_SCRAPE.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: EXECUTE_SCRAPE.ERROR, payload: error });
      },
    }),
  );
