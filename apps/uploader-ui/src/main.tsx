import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app/app';
import { store } from './app/state/';

const theme = createMuiTheme();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <CssBaseline />
          <App />
        </HashRouter>
      </MuiThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
