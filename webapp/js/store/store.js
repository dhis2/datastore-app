import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import api from '../api'
import {FetchDatastoreNamespaces} from '../actions/actions.js'

import reducers from '../reducers/reducers';
import apiReducer from '../reducers/apiReducer'
api.getNamespaces()
    .then(json => console.log(json));

const initialState = { }

const store = createStore(
                reducers,

                  applyMiddleware(promiseMiddleware(),thunk, logger())

              );
//store.dispatch(FetchDatastoreNamespaces())
export default store;
