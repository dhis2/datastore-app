import thunk from 'redux-thunk';

import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import reducers from '../reducers/reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

export default store;
