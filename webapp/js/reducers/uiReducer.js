import * as actions from '../constants/actionTypes';

const fetchedState = {fetching: false, fetched: true, error: false}
const fetchingState = {fetching: true, fetched: false, error: false}
const errorState = {fetching: false, fetched: false, error: true}

const ui = (state = {}, action) => {
    switch (action.type) {
        case actions.SELECT_NAMESPACE: {
          const { selectedNamespace } = action;
          return {
              ...state,
              selectedNamespace
          }
        }
        case actions.SELECT_KEY: {
          const {namespace, key, value} = action;
          return {
              ...state,
              ...fetchedState,
              namespace,
              key,
              value
          }
        }
        case actions.FETCH_VALUE_PENDING: {
          return {
            ...state,
            ...fetchingState
          }
        }
        default:{
          return state;
        }
    }
}

export default ui
