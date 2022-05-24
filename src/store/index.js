import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/index.js'

export default createStore(reducers, applyMiddleware(thunk))
