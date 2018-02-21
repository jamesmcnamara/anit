/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let dom

if (dom = document.getElementById('root')) {
  ReactDOM.render(<App />, dom)
}

registerServiceWorker();
