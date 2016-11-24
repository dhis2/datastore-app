import thunk from 'redux-thunk';

import { createStore, compose, applyMiddleware } from 'redux';

import reducers from '../reducers/reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger');
    const log = createLogger();
    middlewares.push(log);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

export default store;
