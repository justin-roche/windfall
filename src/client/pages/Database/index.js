import React, {
  useEffect,
  useState,
} from 'react';

import Layout from 'components/Layout';
import Result from 'components/Result';
import { connect } from 'react-redux';

import * as action from './action';

let DatabasePage = ({ database, getDatabaseAction }) => {
  console.log('rendering db');
  const [expanded, setExpanded] = useState(null);
  const [data, setData] = useState([]);
  console.log('data set', database);
  if (database && database.data.length > 0 && data.length === 0) {
    setData(database.data);
  }
  useEffect(() => {
    if (!data || data.length === 0) {
      console.log('getting data');
      getDatabaseAction();
    }
  }, []);

  return (
    // <div></div>
    <Layout title='scrape' returnPath='/' showSidebar={true}>
      db
      {data?.map((item, i) => (
        <Result item={item} key={item.originalLink}></Result>
      ))}
    </Layout>
  );
};

const mapStateToProps = ({ global, database }) => ({
  global,
  database,
});

const mapDispatchToProps = {
  getDatabaseAction: action.getDatabaseAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabasePage);
