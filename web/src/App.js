/* @flow */
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as React from 'react';

import store from 'store/store';
import Home from 'pages/home/components';
import Profile from 'pages/profile/components';

type $Props = {
}

export default function App({}: $Props) {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </React.Fragment>
      </Router>
    </Provider>
  )
}
