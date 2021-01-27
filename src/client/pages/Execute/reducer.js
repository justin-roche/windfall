import { ActionType } from 'types';

import {
  EXECUTE_SCRAPE,
  GET_COMMANDS,
} from './action';

const initialState = {
  results: [],
  commands: [],
  metaData: {
    index: 0,
    total: 0,
  },
  error: null,
};

const execute = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_COMMANDS.SUCCESS: {
      return {
        ...state,
        commands: action.payload.map((command) => {
          command.checked = true;
          return command;
        }),
      };
    }
    case EXECUTE_SCRAPE.SUCCESS: {
      const { data, metaData } = action.payload;
      console.log('scrape success', data.length);
      return { ...state };
    }
    case EXECUTE_SCRAPE.ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return { ...state };
  }
};
export default execute;
