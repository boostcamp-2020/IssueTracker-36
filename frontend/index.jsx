import React from 'react';
import ReactDom from 'react-dom';
import App from '@components/App';
import { AppProvider } from '@utils/Context';

ReactDom.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('app'),
);
