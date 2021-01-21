import { Dispatch } from 'redux';

export const updateScrapeResultsAction = () => (dispatch: Dispatch) =>
  dispatch({ type: UPDATE_RESULTS, payload: null });
