import React, {
  useEffect,
  useState,
} from 'react';

import Layout from 'components/Layout';
import Result from 'components/Result';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import * as action from './action';

let ScrapeResults = ({ scrape, getScrapeAction, addResultsAction }) => {
  console.log('rendering scrape');
  const [expanded, setExpanded] = useState(null);
  const [results, setResults] = useState([]);
  if (scrape && scrape.results.length > 0 && results.length === 0) {
    setResults(scrape.results);
    console.log('results set', results.length, scrape.results);
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
      {results?.map((item, i) => (
        <Result item={item} key={item.originalLink}></Result>
      ))}
      <Button onClick={(e) => addResultsAction(results)}>
        Approve Selected
      </Button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrapeResults);
