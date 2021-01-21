import React, {
  useEffect,
  useState,
} from 'react';

import Layout from 'components/Layout';
import { ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
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
        <Card key={item.originalLink}>
          <Card.Header
            style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Card.Title>
                <a href={item.originalLink}>{item.title}</a>
              </Card.Title>
              <Card.Subtitle>{item.company}</Card.Subtitle>
            </div>
            <div>
              <ToggleButton
                type='checkbox'
                style={{ backgroundColor: 'none' }}
                checked={item.approved}
                onClick={(e) => setCheckStatus(i)}></ToggleButton>
            </div>
            {item.approved}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <div>{item.location}</div>
              <div>{item.remote}</div>
              <div>{item.date}</div>
              <div>{item.salary}</div>
              <div>{item.source}</div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              onClick={() =>
                expanded == i ? setExpanded(null) : setExpanded(i)
              }
              aria-controls='example-collapse-text'
              aria-expanded={open}>
              details
            </Button>{' '}
            <Collapse in={expanded === i}>
              <div>
                <div dangerouslySetInnerHTML={{ __html: item.details }}></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.qualifications,
                  }}></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}></div>
              </div>
            </Collapse>
          </Card.Footer>
        </Card>
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
