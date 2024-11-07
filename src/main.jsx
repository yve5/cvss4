import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ReactReduxContext } from 'react-redux';

import App from './app/components/App';
import store from './app/resources/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App context={ReactReduxContext} />
    </Provider>
  </React.StrictMode>
);
