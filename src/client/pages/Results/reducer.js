import { ActionType } from 'types';

import {
  CLEAR_RESULTS,
  GET_RESULTS,
} from './action';

const initialState = {
  results: [],
  metaData: {
    index: 0,
    total: 0,
  },
  error: null,
};

const scrape = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_RESULTS.SUCCESS: {
      const { data, metaData } = action.payload;
      console.log('payload', data.length);
      return {
        ...state,
        results: [
          ...data.map((r) => {
            return { ...r, ...{ approved: true } };
          }),
        ],
        metaData: { ...metaData },
      };
    }
    // case GET_SCRAPE.ERROR: {
    //   return { ...state, error: action.payload };
    // }
    case CLEAR_RESULTS.SUCCESS: {
      return {
        ...state,
        results: [],
      };
    }
    default:
      return { ...state };
  }
};
export default scrape;
