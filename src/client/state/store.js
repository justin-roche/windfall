import React, { useReducer, createContext, useContext } from 'react';
export const AppContext = createContext([]);

const initialState = {
  commands: [],
  results: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'COMPLETE':
      return {
        loading: false,
      };
      break;
    case 'SET_COMMANDS':
      return { ...state, commands: action.payload };
      break;
    case 'UPDATE_COMMAND':
      let commands = state.commands.map((command) => {
        if (command.name == action.payload.name) {
          return { ...command, ...action.payload };
        }
        return command;
      });
      return { ...state, commands };
    case 'SET_RESULTS': {
      return { ...state, results: action.payload };
    }
    case 'UPDATE_RESULTS': {
      return { ...state, results: state.results.concat(action.payload) };
    }
    default:
      throw new Error();
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};

//export const listenForProgressAction = () => {
//const { useStore } = store;
//let socket = io.connect('http://192.168.1.186:8081');
//console.log(socket);
//socket.on('progress', function (data) {
//console.log('got progress', data);
//});
//};
//export const useGetCommandsAction = () => {
//const [isOnline, setIsOnline] = useState(null);
////setIsOnline(true);
////const [_, setState] = store.useStore();
////let p = axios.get('/api/commands').then((res) => {
////console.log('data', res.data);
////setState((old) => {
////return { ...old, commands: res.data };
////});
////});
////return p;
//};
//export const executeScrapeAction = () => {
//let p = axios.post('/execute', { data });
//return p;
//};
