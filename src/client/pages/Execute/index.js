import './styles.scss';

import React, {
  useEffect,
  useState,
} from 'react';

import Layout from 'components/Layout';
import _ from 'lodash';
import { ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import io from 'socket.io-client';

import {
  executeScrapeAction,
  getCommandsAction,
} from './action';

let Execute = () => {
  const [expanded, setExpanded] = useState(null);
  const [commandsState, setCommandsState] = useState([]);
  const [socketState, setSocketState] = useState(null);
  const commands = useSelector((state) => state.execute.commands);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommandsAction());
    let socket = io.connect('http://192.168.1.186:8081');
    setSocketState(socket);
  }, []);
  useEffect(() => {
    setCommandsState(commands);
  }, [commands]);
  let handleCheck = function (i) {
    let arr = [].concat(commandsState);
    arr[i].checked = !arr[i].checked;
    setCommandsState(arr);
  };
  let handleExecute = function () {
    let commands = []
      .concat(commandsState)
      .map((c) => (c.checked ? { ...c, ...{ _progress: 1 } } : c));

    setCommandsState(commands);

    socketState.on('progress', function (data) {
      console.log('got progress', data);
      let commands = [].concat(commandsState);
      let command = _.find(commands, (c) => c.name == data.command.name);
      data.percent == 100
        ? (command._progress = null)
        : (command._progress = data.percent);

      setCommandsState(commands);
    });
    dispatch(
      executeScrapeAction(commandsState.filter((command) => command.checked)),
    );
  };
  return (
    <Layout title='scrape' returnPath='/' showSidebar={true}>
      <Table striped hover>
        <thead>
          <tr>
            <th>Source</th>
            <th>Run</th>
          </tr>
        </thead>
        {commandsState?.length > 0 ? (
          <tbody>
            {commandsState.map((command, i) => (
              <tr key={i}>
                <td>
                  {command.name}
                  {command._progress ? (
                    <ProgressBar now={command._progress} />
                  ) : null}
                </td>
                <td>{command.url}</td>
                <td>
                  <ToggleButton
                    variant='toggle'
                    type='checkbox'
                    checked={command.checked}
                    onClick={(e) => handleCheck(i)}></ToggleButton>
                </td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </Table>
      <Button
        variant='outline-primary'
        class='btn__more'
        onClick={(e) => handleExecute()}>
        Execute Selected
      </Button>
    </Layout>
  );
};
export default Execute;
