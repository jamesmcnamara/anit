/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger'
import multiMiddleware from 'redux-multi'
import promiseMiddleware from 'redux-promise'

import { isDev } from 'shared/utils';

import reducer from './reducers'


const getMiddleware = () => {
  let middleware = [
    multiMiddleware,
    promiseMiddleware,
  ];
  
  if (isDev()) {
    middleware.push(loggerMiddleware);
  }

  return middleware;
}

const store = createStore(reducer, 
  compose(
    applyMiddleware( 
      ...getMiddleware()
    )
  )
)

export default store

// $FlowFixMe
if (module.hot) {
  module.hot.accept('./reducers.js', () =>
    store.replaceReducer(require('./reducers.js').default))
}
