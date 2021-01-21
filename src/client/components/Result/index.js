import React, { useState } from 'react';

import { ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import { connect } from 'react-redux';

import * as action from './action';

let Result = ({ item, updateScrapeResults }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card key={item.originalLink}>
      <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            onClick={(e) => updateScrapeResults()}></ToggleButton>
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
          onClick={() => (expanded ? setExpanded(false) : setExpanded(true))}
          aria-controls='example-collapse-text'
          aria-expanded={open}>
          details
        </Button>{' '}
        <Collapse in={expanded === true}>
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
  );
};

const mapStateToProps = ({ global }) => ({
  global,
});

const mapDispatchToProps = {
  updateScrapeItems: action.updateScrapeResultsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
