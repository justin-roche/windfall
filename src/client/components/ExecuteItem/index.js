import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';
import { CheckSquare, Square, PlayCircle } from 'react-bootstrap-icons';
import { executeScrapeAction } from '../../pages/Execute/action';

function ExecuteItem({ command }) {
  const [commandState, setCommandState] = useState(command);
  console.log('command', command);

  const dispatch = useDispatch();
  let handleCheck = function (i) {
    setCommandState({
      ...commandState,
      ...{ expanded: !commandState.expanded },
    });
  };
  let handleExecute = function () {
    dispatch(executeScrapeAction([command]));
  };
  return (
    <tr>
      <td>
        <Button onClick={(e) => handleCheck(i)}>
          {command.checked ? <CheckSquare></CheckSquare> : <Square></Square>}
        </Button>
      </td>
      <td>
        {command.name}
        {command._progress ? (
          <ProgressBar now={command._progress} animated />
        ) : null}
      </td>
      <td>{command.url}</td>
      <td>
        <Button onClick={(e) => handleExecute()}>
          <PlayCircle></PlayCircle>
        </Button>
      </td>
    </tr>
  );
}

ExecuteItem.propTypes = {};

export default ExecuteItem;
