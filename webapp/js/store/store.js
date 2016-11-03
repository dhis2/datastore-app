import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

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
                  applyMiddleware(thunk, logger())
                )
              );

export default store;
