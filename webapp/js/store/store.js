import React from 'react';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, compose, applyMiddleware } from 'redux';

import api from '../utils/api'
import reducers from '../reducers/reducers';

const initialState = {
  api: {
    namespaces: {}
  },
}

const store = createStore(
                reducers,
                initialState,
                compose (
                  applyMiddleware(promiseMiddleware(), thunk, logger())
                )
              );

export default store;
