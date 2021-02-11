import React, { useState } from 'react';

import { ToggleButton } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

let Result = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card key={item.originalLink}>
      <Card.Header
        style={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={() => (expanded ? setExpanded(false) : setExpanded(true))}>
        <div>
          <Card.Title>
            <a href={item.originalLink}>{item.title}</a>
          </Card.Title>
          <Card.Subtitle>{item.company}</Card.Subtitle>
          <div>{item.date}</div>
          <div>{item._date}</div>
        </div>
        <div>
          <ToggleButton
            type='checkbox'
            style={{ backgroundColor: 'none' }}
            checked={item.approved}
            onClick={(e) => {}}></ToggleButton>
        </div>
        {item.approved}
      </Card.Header>
      <Collapse in={expanded === true}>
        <Card.Body>
          <Card.Text>
            <div>{item.location}</div>
            <div>{item.remote}</div>
            <div>{item.date}</div>
            <div>{item.salary}</div>
            <div>{item.source}</div>
          </Card.Text>
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
        </Card.Body>
      </Collapse>
      <Card.Footer>
        {/* <Button
          onClick={() => (expanded ? setExpanded(false) : setExpanded(true))}
          aria-controls='example-collapse-text'
          aria-expanded={open}>
          details
        </Button>{' '} */}
        {/* <Collapse in={expanded === true}> */}
        {/* </Collapse> */}
      </Card.Footer>
    </Card>
  );
};
export default Result;
