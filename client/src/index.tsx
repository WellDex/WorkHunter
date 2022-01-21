import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/scss/styles.scss';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {ApiProvider} from 'react-use-api';
import axios, {AxiosInstance, AxiosStatic} from 'axios';

const apiContext = {
  settings: {
    axios: axios as AxiosStatic | AxiosInstance,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider context={apiContext}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
