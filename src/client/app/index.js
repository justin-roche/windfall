/* @flow */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { ToastContainer } from 'react-toastify';
import head from 'utils/head';

const App = ({ route }) => {
  useEffect(() => {}, []);

  return (
    <>
      <Helmet {...head} />
      {renderRoutes(route.routes)}
      <ToastContainer />
    </>
  );
};
//export default hot(module)(App);
export default App;
