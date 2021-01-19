import React, { useEffect } from 'react';

// import { isEmail } from 'validator';
import Layout from 'components/Layout';
import { connect } from 'react-redux';

import * as action from './action';

let Login = ({ scrape, getScrapeAction }) => {
  let results = scrape.results;
  useEffect(() => {
    if (!results || results.length === 0) {
      getScrapeAction();
    }
  }, []);
  console.log('scrape', scrape);
  return (
    <Layout title='scrape' returnPath='/' showSidebar={false}>
      scrape here
      {results.length}
      {scrape?.results?.map((item, i) => (
        <div className='post__item' key={i}>
          <h1 className='post__title'>{item.title}</h1>
        </div>
      ))}
    </Layout>
  );
};

const mapStateToProps = ({ global, scrape }) => ({
  global,
  scrape,
});

const mapDispatchToProps = {
  //   loginAction: action.loginAction,
  getScrapeAction: action.getScrapeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
