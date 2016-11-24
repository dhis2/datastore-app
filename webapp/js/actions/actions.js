import * as actions from '../constants/actionTypes';
import api from '../utils/api';

export function fetchAndToggleNamespace(namespace) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return api.getKeys(namespace)
            .then(keys => {
                dispatch(recieveKeys(namespace, keys));
               // dispatch(toggleNamespace(namespace)).catch(error => console.log(error));
            }).then(() => dispatch(toggleNamespace(namespace)))
            .catch(error => {
                dispatch(rejectKeys(namespace, error))
            });
    }
}

export function fetchAndDisplayKeyValue(namespace, key) {
    return dispatch => {
        dispatch(requestValue(namespace, key));
        return api.getValue(namespace, key)
            .then(value => {
                dispatch(recieveValue(namespace, key, value));
                dispatch(selectKey(namespace, key, value));
            })
            .catch(error => dispatch(rejectValue(namespace, key, error)));
    }
}

export function createNewNamespaceDisplayEmpty(namespace,key) {
    return dispatch => {
        dispatch(createValue(namespace,key,{}))
         //   .then(() => dispatch(createNewNamespace(namespace,key)))
            .then(success => dispatch(fetchAndToggleNamespace(namespace)))
            .then(success => dispatch(fetchAndDisplayKeyValue(namespace,key)))
            .catch(error => dispatch(rejectCreateValue(namespace,key,{},error)))
    }
}

export function createAndDisplayValue(namespace, key) {
    return dispatch => {
        dispatch(createValue(namespace,key,{}))
            .then(success => dispatch(fetchAndToggleNamespace(namespace)))
            .then(success => dispatch(fetchAndDisplayKeyValue(namespace,key)))
            .catch(error => dispatch(rejectCreateValue(namespace,key,{},error)))
    }
}

export function fetchNamespaces() {
    return dispatch => {
        dispatch(requestNamespaces());
        return api.getNamespaces()
            .then(namespaces => dispatch(recieveNamespaces(namespaces)))
            .catch(error => dispatch(rejectNamespaces(error)));
    }
}

/**
 * Creates a value within namespace with given key.
 * If namespace or key doesn't exist they will be created.
 * @param namespace
 * @param key
 * @param value
 * @returns a action-promise
 */
export function createValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestCreateValue(namespace,key,value));
        return api.createValue(namespace, key, value)
            .then(success => dispatch(receivedCreateValue(namespace, key, value)))
    }
}

export function fetchKeys(namespace) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return api.getKeys(namespace)
            .then(keys => dispatch(recieveKeys(namespace, keys)))
    }
}

export function fetchValue(namespace, key) {
    return dispatch => {
        dispatch(requestValue(namespace, key));
        return api.getValue(namespace, key)
            .then(value => dispatch(recieveValue(namespace, key, value)))
            .catch(error => dispatch(rejectValue(namespace, key, error)));
    }
}

export function fetchHistory(namespace, key) {
    return dispatch => {
        dispatch(requestHistory());
        return api.getHistory(namespace, key)
            .then(history => console.log(history))
            .catch(error => console.log(error));
    }
}

export function updateHistory(namespace, key, value) {
    return dispatch => {
        return api.updateHistory(namespace, key, value)
            .then(success => console.log(success))
            .catch(error => console.log(error));
    }
}


export function updateValue(namespace, key, value) {
    return dispatch => {
        console.log("update value");
        dispatch(requestUpdateValue(namespace,key,value));
        return api.updateValue(namespace, key, value)
            .then(success => dispatch(receiveUpdateValue(namespace,key,value)))
            .catch(error => dispatch(rejectUpdateValue(namespace,key,value)))
    }
}

export function deleteKey(namespace, key) {
    return dispatch => {
        dispatch(requestDeleteKey(namespace,key));
        return api.deleteValue(namespace, key)
            .then(success => dispatch(receiveDeleteKey(namespace,key)))
            .then(() => dispatch(fetchKeys(namespace)))
            .catch(error => {
                if(error.status === 404) { //If not found, we remove the namespace from UI
                    return dispatch(fetchNamespaces())
                } else if (error) { //propagate error
                    throw error;
                } else {  //togglenamespace if not last key
                    return dispatch(toggleNamespace(namespace))
                }
            /*    return error.status === 404 ? dispatch(fetchNamespaces())
                    : dispatch(toggleNamespace(namespace)) */
            })
            .catch(error => {
                dispatch(rejectDeleteKey(namespace,key))
            });
    }
}

export function deleteNamespace(namespace) {
    return dispatch => {
        dispatch(requestDeleteNamespace(namespace));
        return api.deleteNamespace(namespace)
            .then(success => {
                dispatch(fetchNamespaces());
                dispatch(receiveDeleteNamespace(namespace));
                return success;
            })
            .catch(error => dispatch(rejectDeleteNamespace(namespace)));
    }
}

/**
 *  Namespace Action Creators
 */
export function recieveNamespaces(namespaces) {
    return {
        type: actions.FETCH_NAMESPACES_FULFILLED,
        namespaces
    }
}

export function rejectNamespaces(error) {
    return {
        type: actions.FETCH_NAMESPACES_REJECTED,
        error
    }
}

export function requestNamespaces() {
    return {
        type: actions.FETCH_NAMESPACES_PENDING
    }
}

/**
 *  Key Action Creators
 */
export function recieveKeys(namespace, keys) {
    return {
        type: actions.FETCH_KEYS_FULFILLED,
        namespace,
        keys
    }
}

export function requestKeys(namespace) {
    return {
        type: actions.FETCH_KEYS_PENDING,
        namespace
    }
}

export function rejectKeys(namespace, error) {
    return {
        type: actions.FETCH_KEYS_REJECTED,
        namespace,
        error
    }
}
/* These are used for creation of namespaces, as you need
* a key and a value to create a namespace*/

function receivedCreateValue(namespace, key, value) {
    return {
        type: actions.CREATE_VALUE_FULFILLED,
        namespace,
        key,
        value
    }
}

function requestCreateValue(namespace,key,value) {
    return {
        type: actions.CREATE_VALUE_PENDING,
        namespace,
        key,
        value
    }
}

function rejectCreateValue(namespace,key,value, error) {
    return {
        type: actions.CREATE_VALUE_REJECTED,
        namespace,
        key,
        value,
        error
    }

}


/**
 *  Value Action Creators
 */
export function recieveValue(namespace, key, value) {
    return {
        type: actions.FETCH_VALUE_FULFILLED,
        namespace,
        key,
        value
    }
}

export function requestValue(namespace, key) {
    return {
        type: actions.FETCH_VALUE_PENDING,
        namespace,
        key
    }
}

export function rejectValue(namespace, key, error) {
    return {
        type: actions.FETCH_VALUE_REJECTED,
        namespace,
        key,
        error
    }
}

function requestUpdateValue(namespace,key,value) {
    return {
        type: actions.UPDATE_VALUE_PENDING,
        namespace,
        key,
        value
    }
}

function receiveUpdateValue(namespace,key,value) {
    return {
        type: actions.UPDATE_VALUE_FULFILLED,
        namespace,
        key,
        value
    }
}

function rejectUpdateValue(namespace,key,value,error) {
    return {
        type: actions.UPDATE_VALUE_FULFILLED,
        namespace,
        key,
        value,
        error
    }
}

function requestDeleteKey(namespace,key) {
    return {
        type: actions.DELETE_KEY_PENDING,
        namespace,
        key
    }
}

function receiveDeleteKey(namespace,key) {
    return {
        type: actions.DELETE_KEY_FULFILLED,
        namespace,
        key,
    }
}

function rejectDeleteKey(namespace,key,error) {
    return {
        type: actions.DELETE_KEY_REJECTED,
        namespace,
        key,
        error
    }
}

function requestDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_PENDING,
        namespace
    }
}

function receiveDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_FULFILLED,
        namespace
    }
}

function rejectDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_REJECTED,
        namespace
    }
}
/**
 *  History Action Creators
 */

export function requestHistory() {
  return {
    type: actions.REQUEST_HISTORY_PENDING
  }
}

/**
 *  UI Action Creators
 */

export function valueChange(namespace, key, value) {
    return {
        type: actions.VALUE_CHANGE,
        namespace,
        key,
        value
    }
}
export function toggleNamespace(namespace) {
    return {
        type: actions.TOGGLE_NAMESPACE,
        namespace
    }
}

export function selectKey(namespace, key, value) {
    return {
        type: actions.SELECT_KEY,
        namespace,
        key,
        value
    }
}

/* Open a modal with given props, if no props are given
* dialogprops will be an empty object.*/
export function openDialog(dialogprops) {
    return {
        type: actions.OPEN_DIALOG,
        dialogType: 'NEW_NAMESPACE',
        dialogprops: {...dialogprops} //ensure empty object
    }
}

/* Open a modal with given props, if no props are given
 * dialogprops will be an empty object.*/
export function closeDialog(dialogprops) {
    return {
        type: actions.CLOSE_DIALOG,
        dialogType: 'NEW_NAMESPACE',
        dialogprops: {...dialogprops} //ensure empty object
    }
}
export function createNewNamespace(namespace, key) {
    return {
        type: actions.CREATE_NAMESPACE,
        namespace,
        key
    }
}


export function saveValueFromEditor() {
    
}
