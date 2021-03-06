/* @flow */
import './vendor';
import '../i18n';
import React, { Suspense } from 'react';
import { AppContainer } from 'react-hot-loader';
import { render, hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { loadableReady } from '@loadable/component';
import Loading from 'components/Loading';
import routes from '../routes';
import { AppContextProvider } from './state/store';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const bootstrap = (routesConfig: Array<Object>) => {
  const renderMethod = module.hot ? render : hydrate;
  renderMethod(
    <Suspense fallback={<Loading />}>
      <AppContextProvider>
        <AppContainer>
          <BrowserRouter>{renderRoutes(routesConfig)}</BrowserRouter>
        </AppContainer>
      </AppContextProvider>
    </Suspense>,
    document.getElementById('react-view'),
  );
};

loadableReady(() => {
  bootstrap(routes);
});

if (module.hot) {
  module.hot.accept('../routes', async () => {
    try {
      const nextRoutes = await import('../routes');

      bootstrap(nextRoutes.default);
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}

if (!__DEV__) {
  require('offline-plugin/runtime').install();
}
