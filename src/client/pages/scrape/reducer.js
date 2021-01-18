import { ActionType } from 'types';

import { GET_SCRAPE } from './action';

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
    case GET_SCRAPE.SUCCESS: {
      const { results, metaData } = action.payload;

      return {
        ...state,
        results: [...results],
        metaData: { ...metaData },
      };
    }
    case GET_SCRAPE.ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return { ...state };
  }
};
export default scrape;
