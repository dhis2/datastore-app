import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import api from '../api'
import reducers from '../reducers/reducers';

api.getNamespaces()
    .then(json => console.log(json));

const initialState = { }

const store = createStore(
                reducers,
                initialState,
                compose(
                  applyMiddleware(promiseMiddleware(),thunk, logger())
                )
              );

export default store;
