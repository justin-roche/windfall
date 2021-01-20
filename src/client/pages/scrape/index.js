import React, { useEffect } from 'react';

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
    <Layout title='scrape' returnPath='/' showSidebar={true}>
      {scrape?.results?.map((item, i) => (
        <div className='card' key={i}>
          <div className='card-body'>
            <h5 className='card-title'>
              <a href={item.originalLink}>{item.title}</a>
            </h5>
            <h6 className='card-subtitle text-muted'>{item.company}</h6>
            <div className='card-text'>{item.location}</div>
            <div className='card-text'>{item.remote}</div>
            <div className='card-text'>{item.date}</div>
            <div className='card-text'>{item.salary}</div>
            <div className='card-text'>{item.source}</div>
          </div>
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
  getScrapeAction: action.getScrapeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
