import React, {
  useEffect,
  useState,
} from 'react';

import Layout from 'components/Layout';
import { ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  executeScrapeAction,
  getCommandsAction,
} from './action';

let Execute = () => {
  const [expanded, setExpanded] = useState(null);
  const [commandsState, setCommandsState] = useState([]);
  const commands = useSelector((state) => state.execute.commands);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommandsAction());
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
    dispatch(
      executeScrapeAction(commandsState.filter((command) => command.checked)),
    );
  };
  return (
    <Layout title='scrape' returnPath='/' showSidebar={true}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Source</th>
            <th>Run</th>
          </tr>
        </thead>
        {commands?.length > 0 ? (
          <tbody>
            {commands.map((command, i) => (
              <tr key={i}>
                <td>{command.url}</td>
                <td>
                  <ToggleButton
                    type='checkbox'
                    checked={command.checked}
                    onClick={(e) => handleCheck(i)}></ToggleButton>
                </td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </Table>
      <Button onClick={(e) => handleExecute()}>Execute Selected</Button>
    </Layout>
  );
};
export default Execute;
