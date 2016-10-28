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
      {text: "box2", id:3},
      {text: "box2", id:4},
      {text: "box2", id:5},
      {text: "box2", id:6},
      {text: "box2", id:7},
      {text: "box2", id:8},
      {text: "box2", id:9},
      {text: "box2", id:10},
      {text: "box2", id:11},
      {text: "box2", id:12},
      {text: "box2", id:13},
      {text: "box2", id:14},
      {text: "box2", id:15},
      {text: "box3", id:16}
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
