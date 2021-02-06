import Layout from 'components/Layout';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import ExecuteItem from '../../components/ExecuteItem';
import { getCommandsAction, listenForProgressAction } from './action';
import './styles.scss';

let Execute = () => {
  const [busyExecutingState, setBusyExecutingState] = useState(false);
  const commands = useSelector((state) => state.execute.commands);
  const dispatch = useDispatch();
  console.log('execute mounted');
  useEffect(() => {
    dispatch(getCommandsAction());
    dispatch(listenForProgressAction());
  }, []);
  useEffect(() => {
    console.log('commands updated');
  }, [commands]);
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
