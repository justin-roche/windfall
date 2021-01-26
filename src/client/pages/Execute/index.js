import React, {
  useEffect,
  useState,
} from 'react';

import Layout from 'components/Layout';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';

import * as action from './action';

let Execute = ({ executeAction, getCommandsAction, global, commands }) => {
  const [expanded, setExpanded] = useState(null);
  useEffect(() => {
    getCommandsAction();
  }, []);
  return (
    <Layout title='scrape' returnPath='/' showSidebar={true}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Source</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {commands?.length > 0 ? (
          <tbody>
            {commands.map((command) => (
              <tr>
                <td>{command.url}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </Table>
      <Button onClick={(e) => executeAction()}>Execute Selected</Button>
    </Layout>
  );
};

const mapStateToProps = ({ global, execute }) => ({
  global,
  commands: execute.commands,
});

const mapDispatchToProps = {
  executeAction: action.executeScrapeAction,
  getCommandsAction: action.getCommandsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Execute);
