import Layout from 'components/Layout';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
//import ExecuteItem from '../../components/ExecuteItem';
import './styles.scss';
import { AppContext } from '../../state/store';
import useApiRequest, {
  makeRequest,
  getCommands,
  onSocketProgress,
} from '../../state/useApi';
import { setCommands, updateCommand } from '../../state/actions';
import ExecuteItem from '../../components/ExecuteItem';

let Execute = () => {
  const [globalState, dispatch] = useContext(AppContext);
  const commands = globalState ? globalState.commands : [];
  console.log('commands', commands);
  const [busyExecutingState, setBusyExecutingState] = useState(false);
  useEffect(() => {
    console.log('running use effect');
    getCommands().then((response) => {
      dispatch(setCommands(response));
    });
    onSocketProgress((data) => {
      console.log('socket prog', data, globalState.commands);
      dispatch(
        updateCommand({ progress: data.percent, name: data.command.name }),
      );
    });
  }, []);
  //useEffect(() => {
  //console.log('global updated');
  //}, [commands]);
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
