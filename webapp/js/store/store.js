import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import api from '../utils/api'

import reducers from '../reducers/reducers';

const initialState = {
  data: {
    items: [
      {text: "box1", id:1},
      {text: "box2", id:2},
      {text: "box3", id:3}
    ],
  },
  api: {

  }
}

const store = createStore(
                reducers,
                initialState,
                compose (
                  applyMiddleware(thunk, logger)
                )
              );

export default store;
