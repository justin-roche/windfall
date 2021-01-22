import React, { useState } from 'react';

import Layout from 'components/Layout';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';

import * as action from './action';

let Execute = ({ executeAction }) => {
  console.log('rendering scrape');
  const [expanded, setExpanded] = useState(null);
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
        <tbody>
          <tr>
            <td>Indeed</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <Button onClick={(e) => executeAction()}>Execute Selected</Button>
    </Layout>
  );
};

const mapStateToProps = ({ global }) => ({
  global,
});

const mapDispatchToProps = {
  executeAction: action.executeScrapeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Execute);
