import React, {
  useEffect,
  useState,
} from 'react';

import Layout from 'components/Layout';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getCommandsAction } from './action';

let Execute = () => {
  const [expanded, setExpanded] = useState(null);
  const [commandsState, setCommandsState] = useState([]);
  const commands = useSelector((state) => state.execute.commands);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommandsAction());
  }, []);
  useEffect(() => {
    setCommandsState(commands);
  }, [commands]);
  return (
    <Layout title='scrape' returnPath='/' showSidebar={true}>
      <Table striped bordered hover>
        <thead>
          length:{commandsState.length}
          <tr>
            <th>Source</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {commands?.length > 0 ? (
          <tbody>
            {commands.map((command, i) => (
              <tr key={i}>
                <td>{command.url}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </Table>
      <Button onClick={(e) => dispatch(executeAction())}>
        Execute Selected
      </Button>
    </Layout>
  );
};

// const mapStateToProps = ({ global, execute }) => ({
//   global,
//   commands: ['a'], //execute.commands,
// });

// const mapDispatchToProps = {
//   executeAction: action.executeScrapeAction,
//   getCommandsAction: action.getCommandsAction,
// };

export default Execute; //connect(mapStateToProps, mapDispatchToProps)(Execute);
