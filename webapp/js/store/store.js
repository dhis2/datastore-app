import React from 'react';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, compose, applyMiddleware } from 'redux';

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
