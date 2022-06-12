import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import App from './App';
import { AppStore } from './redux/index';
import reportWebVitals from './reportWebVitals';
import CheckAuth from './components/molecules/CheckAuth';
import StatusNotification from './components/molecules/StatusNotification';
import { LocalizationProvider } from '@mui/lab';
import './index.css';
import {THEME} from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <Provider store={AppStore}>
        <LocalizationProvider dateAdapter={DateAdapter} >
          <CheckAuth>
            <SnackbarProvider maxSnack={2} dense >
              <StatusNotification />
            </SnackbarProvider>
            <App />
          </CheckAuth>
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
