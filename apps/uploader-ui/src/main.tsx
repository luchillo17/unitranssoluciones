import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './app/app';

const theme = createMuiTheme();

ReactDOM.render(
  <StrictMode>
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <CssBaseline />
        <App />
      </HashRouter>
    </MuiThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
