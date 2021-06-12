import { CssBaseline } from '@material-ui/core';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './app/app';

console.log('React app loaded');

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <CssBaseline />
      <App />
    </HashRouter>
  </StrictMode>,
  document.getElementById('root')
);
