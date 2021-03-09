import Layout from 'components/Layout';
import Result from 'components/Result';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { AppContext } from '../../state/store';

let ScrapeResults = () => {
  const [globalState, dispatch] = useContext(AppContext);
  const results = globalState ? globalState.results : [];
  const [_results, _setResults] = useState(sortResults(results));
  function sortResults(results) {
    let sorted = results.sort((a, b) => {
      let _a = moment(a._date, 'DD-MM-YY');
      let _b = moment(b._date, 'DD-MM-YY');
      let x = _a.isAfter(_b) ? -1 : 1;
      return x;
    });
    console.log('file: index.js ~ line 20 ~ sorted ~ sorted', sorted);
    return sorted;
  }
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
            <td>{_results.length}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      {_results?.map((item, i) => (
        <Result item={item} key={item._id}></Result>
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
