import React, {
  useEffect,
  useState,
} from 'react';

import Layout from 'components/Layout';
import Result from 'components/Result';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';

import * as action from './action';

let ScrapeResults = ({
  scrape,
  getScrapeAction,
  addResultsAction,
  clearResultsAction,
}) => {
  console.log('rendering scrape');
  const [expanded, setExpanded] = useState(null);
  const [results, setResults] = useState([]);
  if (scrape && scrape.results.length > 0 && results.length === 0) {
    setResults(scrape.results);
    console.log('results set', scrape.results);
  }
  useEffect(() => {
    if (!results || results.length === 0) {
      getScrapeAction();
    }
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

const mapStateToProps = ({ global, scrape }) => ({
  global,
  scrape,
});

const mapDispatchToProps = {
  getScrapeAction: action.getScrapeAction,
  addResultsAction: action.addResultsAction,
  clearResultsAction: action.clearResultsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrapeResults);
