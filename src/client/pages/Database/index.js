import React, { useEffect, useState } from 'react';

import Layout from 'components/Layout';
import Result from 'components/Result';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { getDatabaseAction } from '../../state/useApi';

let DatabasePage = () => {
  const [expanded, setExpanded] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    getDatabaseAction().then((results) => {
      setData(results.results);
    });
  }, []);

  return (
    // <div></div>
    <Layout title='database' returnPath='/' showSidebar={true}>
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
            <td>{data.length}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      {data?.map((item, i) => (
        <Result item={item} key={item.originalLink}></Result>
      ))}
    </Layout>
  );
};

export default DatabasePage;
