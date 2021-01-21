import { ActionType } from 'types';

import { GET_DATABASE } from './action';

const initialState = {
  data: [],
  metaData: {
    index: 0,
    total: 0,
  },
  error: null,
};

const database = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_DATABASE.SUCCESS: {
      const { results, metaData } = action.payload;
      return {
        ...state,
        data: results,
        metaData: { ...metaData },
      };
    }
    case GET_DATABASE.ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return { ...state };
  }
};
export default database;
