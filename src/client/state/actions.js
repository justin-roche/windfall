export const success = () => {
  return { type: 'SUCCESS' };
};
export const request = () => {
  return { type: 'REQUEST' };
};

export const error = () => {
  return { type: 'ERROR' };
};

export const setCommands = (data) => {
  return { type: 'SET_COMMANDS', payload: data };
};

export const updateCommand = (data) => {
  return { type: 'UPDATE_COMMAND', payload: data };
};

export const updateResults = (data) => {
  return { type: 'UPDATE_RESULTS', payload: data };
};
