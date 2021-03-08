import Layout from 'components/Layout';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ExecuteItem from '../../components/ExecuteItem';
import { setCommands, updateCommand, updateResults } from '../../state/actions';
import { AppContext } from '../../state/store';
import {
  getCommands,
  onSocketProgress,
  onSocketEvents,
} from '../../state/useApi';
import './styles.scss';

let Execute = () => {
  const [globalState, dispatch] = useContext(AppContext);
  const commands = globalState ? globalState.commands : [];
  const [busyExecutingState, setBusyExecutingState] = useState(false);
  useEffect(() => {
    getCommands().then((response) => {
      dispatch(setCommands(response));
    });
    onSocketEvents(
      (data) => {
        console.log('socket prog', data, globalState.commands);
        dispatch(updateCommand({ progress: data.percent, name: data.name }));
      },
      (data) => {
        console.log('socket results', data, globalState.results);
        dispatch(updateResults(data.results));
      },
    );
  }, []);

  return (
    <Layout title='scrape' returnPath='/' showSidebar={true}>
      <Table striped hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Url</th>
            <th>Run</th>
          </tr>
        </thead>
        {commands?.length > 0 ? (
          <tbody>
            {commands.map((command, i) => (
              <ExecuteItem command={command} key={i}></ExecuteItem>
            ))}
          </tbody>
        ) : null}
      </Table>
      <Button variant='outline-primary' onClick={(e) => handleExecute()}>
        Execute Selected
      </Button>
    </Layout>
  );
};
export default Execute;
