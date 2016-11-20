import * as actions from '../constants/actionTypes';

const fetchedState = {fetching: false, fetched: true, error: false}
const fetchingState = {fetching: true, fetched: false, error: false}
const errorState = {fetching: false, fetched: false, error: true}

const ui = (state = {openNamespaceDialog:false}, action) => {
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

        case actions.UPDATE_VALUE_FULFILLED: {
            const {namespace, key, value} = action;
            return {
                ...state,
                ...errorState,
                value
            }
        }

        case actions.UPDATE_VALUE_REJECTED: {
            return {
                ...state,
                updateError: true
            }

        }
        case actions.SET_NAMESPACE_DIALOG_OPEN_STATE: {
            return {
                ...state,
                openNamespaceDialog: action.open
            }
        }

        case actions.CREATE_NAMESPACE: {
            const {namespace, key} = action;
            return {
                ...state,
                namespaceToBeCreated: {
                    namespace,
                    key
                },
            }
        }
        case actions.VALUE_CHANGE: {
            const {namespace, key, value} = action;
            return {
                ...state,
                namespace,
                key,
                editedValue: value
            }
        }
        default:{
          return state;
        }
    }
}

export default ui
