import Layout from 'components/Layout';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ExecuteItem from '../../components/ExecuteItem';
import { setCommands, updateCommand } from '../../state/actions';
import { AppContext } from '../../state/store';
import { getCommands, onSocketProgress } from '../../state/useApi';
import './styles.scss';

let Execute = () => {
  const [globalState, dispatch] = useContext(AppContext);
  const commands = globalState ? globalState.commands : [];
  let count = 0;
  console.log('commands', commands);
  const [busyExecutingState, setBusyExecutingState] = useState(false);
  useEffect(() => {
    getCommands().then((response) => {
      dispatch(setCommands(response));
    });
    onSocketProgress((data) => {
      console.log('socket prog', data, globalState.commands);
      console.log('counter', count);
      dispatch(
        updateCommand({ progress: data.percent, name: data.command.name }),
      );
    });
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
