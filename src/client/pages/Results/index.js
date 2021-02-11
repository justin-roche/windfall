import React, { useEffect, useState } from 'react';

import Layout from 'components/Layout';
import Result from 'components/Result';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';

import { getResultsAction } from '../../state/useApi';

let ScrapeResults = () => {
  const [expanded, setExpanded] = useState(null);
  const [results, setResults] = useState([]);
  function sortResults(results) {
    let sorted = results.sort((a, b) => {
      let _a = moment(a._date, 'DD-MM-YY');
      let _b = moment(b._date, 'DD-MM-YY');
      let x = _a.isAfter(_b) ? -1 : 1;
      return x;
    });
    return sorted;
  }
  useEffect(() => {
    getResultsAction().then((results) => {
      console.log('results', results);
      setResults(sortResults(results));
    });
  }, []);
  function setCheckStatus(i) {
    let current = [].concat(results);
    current[i].approved = !current[i].approved;
    setResults(current);
  }
  return (
    <Layout title='scrape' returnPath='/' showSidebar={true}>
      <Button onClick={(e) => addResultsAction(results)}>
        Approve Selected
      </Button>
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
            <td>{results.length}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      {results?.map((item, i) => (
        <Result item={item} key={i}></Result>
        // <div key={i}>{item.originalLink}</div>
      ))}
      <Button onClick={(e) => addResultsAction(results)}>
        Approve Selected
      </Button>
      <Button onClick={(e) => clearResultsAction()}>Clear All</Button>
    </Layout>
  );
};
export default ScrapeResults;
