import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';
import { CheckSquare, Square, PlayCircle } from 'react-bootstrap-icons';
import { executeScrapeAction, onSocketProgress } from '../../state/useApi';
import { setCommands } from '../../state/actions';

function ExecuteItem({ command }) {
  const [commandState, setCommandState] = useState(command);

  let handleCheck = function (i) {
    // setCommandState({
    //   ...commandState,
    //   ...{ expanded: !commandState.expanded },
    // });
  };
  /*useEffect(() => {});*/
  let handleExecute = function () {
    executeScrapeAction([command]);
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
        {command.progress ? (
          <ProgressBar now={command.progress} animated />
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
