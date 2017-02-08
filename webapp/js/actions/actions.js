import * as actions from 'constants/actionTypes';
import api from 'utils/api';
import { hashHistory } from 'react-router';

/**
 * recieveNamespaces - Deliver namespaces returned from request
 *
 * @param  {array} namespaces Namespaces retrieved from request
 * @return {object}            Action
 */
export function recieveNamespaces(namespaces) {
    return {
        type: actions.FETCH_NAMESPACES_FULFILLED,
        namespaces,
    };
}


/**
 * rejectNamespaces - Return reject signal for namespaces
 *
 * @param  {object} error Error from rejected request
 * @return {object}       Action
 */
export function rejectNamespaces(error) {
    return {
        type: actions.FETCH_NAMESPACES_REJECTED,
        error,
    };
}


/**
 * requestNamespaces - Return waiting signal for namespaces
 *
 * @return {object}  Action
 */
export function requestNamespaces() {
    return {
        type: actions.FETCH_NAMESPACES_PENDING,
    };
}


/**
 * recieveKeys - Deliver keys returned from request
 *
 * @param  {array} namespace Namespace of which keys are requested
 * @param  {array} keys      Keys retrieved from request
 * @return {object}           Action
 */
export function recieveKeys(namespace, keys) {
    return {
        type: actions.FETCH_KEYS_FULFILLED,
        namespace,
        keys,
    };
}


/**
 * requestKeys - Return waiting signal for keys
 *
 * @param  {string} namespace Namespace of which keys are requested
 * @return {object}           Action
 */
export function requestKeys(namespace) {
    return {
        type: actions.FETCH_KEYS_PENDING,
        namespace,
    };
}


/**
 * rejectKeys - Return reject signal for requested keys
 *
 * @param  {string} namespace Namespace of which keys are requested
 * @param  {object} error     Error return from rejected request
 * @return {object}           Action
 */
export function rejectKeys(namespace, error) {
    return {
        type: actions.FETCH_KEYS_REJECTED,
        namespace,
        error,
    };
}


/**
 * receivedCreateValue - Deliver value returned from request
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key holding value
 * @param  {string} value     Value created
 * @return {object}           Action
 */
export function receivedCreateValue(namespace, key, value) {
    return {
        type: actions.CREATE_VALUE_FULFILLED,
        namespace,
        key,
        value,
    };
}


/**
 * requestCreateValue - Return pending request for value creation
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key holding value
 * @param  {string} value     Value to be created
 * @return {object}           Action
 */
export function requestCreateValue(namespace, key, value) {
    return {
        type: actions.CREATE_VALUE_PENDING,
        namespace,
        key,
        value,
    };
}


/**
 * rejectCreateValue - Return reject signal for value creation
 *
 * @param  {string} namespace Namespce holding key
 * @param  {string} key       Key holding value
 * @param  {string} value     Value that was to be created
 * @param  {object} error     Error returned from rejected request
 * @return {object}           Action
 */
export function rejectCreateValue(namespace, key, value, error) {
    return {
        type: actions.CREATE_VALUE_REJECTED,
        namespace,
        key,
        value,
        error,
    };
}


/**
 * recieveValue - Return value recieved from request
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key holding value
 * @param  {string} value     Value requested
 * @return {object}           Action
 */
export function recieveValue(namespace, key, value) {
    return {
        type: actions.FETCH_VALUE_FULFILLED,
        namespace,
        key,
        value,
    };
}


/**
 * requestValue - Return pending request for value creation
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key holding requested value
 * @return {object}           Action
 */
export function requestValue(namespace, key) {
    return {
        type: actions.FETCH_VALUE_PENDING,
        namespace,
        key,
    };
}


/**
 * rejectValue - Return reject signal from requested value
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key holding requested value
 * @param  {object} error     Error returned from request
 * @return {object}           Action
 */
export function rejectValue(namespace, key, error) {
    return {
        type: actions.FETCH_VALUE_REJECTED,
        namespace,
        key,
        error,
    };
}


/**
 * requestUpdateValue - Request a value update
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key of requested value update
 * @param  {string} value     Updated value
 * @return {object}           Action
 */
export function requestUpdateValue(namespace, key, value) {
    return {
        type: actions.UPDATE_VALUE_PENDING,
        namespace,
        key,
        value,
    };
}


/**
 * receiveUpdateValue - Recieve confirmation of updated value
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key of requested value update
 * @param  {string} value     Update value
 * @return {object}           Action
 */
export function receiveUpdateValue(namespace, key, value) {
    return {
        type: actions.UPDATE_VALUE_FULFILLED,
        namespace,
        key,
        value,
    };
}


/**
 * rejectUpdateValue - Reject update value request
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key of requested update key
 * @param  {string} value     Updated value
 * @param  {object} error     Error returned from rejeted request
 * @return {object}           Action
 */
export function rejectUpdateValue(namespace, key, value, error) {
    return {
        type: actions.UPDATE_VALUE_REJECTED,
        namespace,
        key,
        value,
        error,
    };
}


/**
 * requestDeleteKey - Request deleteion of a key
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key to be deleted
 * @return {object}           Action
 */
export function requestDeleteKey(namespace, key) {
    return {
        type: actions.DELETE_KEY_PENDING,
        namespace,
        key,
    };
}


/**
 * receiveDeleteKey - Confirm deletion of key
 *
 * @param  {string} namespace Namespace that held key
 * @param  {string} key       Key deleted
 * @return {object}           Action
 */
export function receiveDeleteKey(namespace, key) {
    return {
        type: actions.DELETE_KEY_FULFILLED,
        namespace,
        key,
    };
}


/**
 * rejectDeleteKey - Reject key deletion request
 *
 * @param  {string} namespace Namespace holding key
 * @param  {string} key       Key to be deleted
 * @param  {object} error     Error returned from rejected request
 * @return {object}           Action
 */
export function rejectDeleteKey(namespace, key, error) {
    return {
        type: actions.DELETE_KEY_REJECTED,
        namespace,
        key,
        error,
    };
}


/**
 * requestDeleteNamespace - Request deletion of namespace
 *
 * @param  {string} namespace Namespace to be deleted
 * @return {object}           Action
 */
export function requestDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_PENDING,
        namespace,
    };
}


/**
 * receiveDeleteNamespace - Confirmation of delted namespace
 *
 * @param  {string} namespace Namespace deleted
 * @return {object}           Action
 */
export function receiveDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_FULFILLED,
        namespace,
    };
}


/**
 * rejectDeleteNamespace - Reject request for namespace deletion
 *
 * @param  {string} namespace Namespace to be deleted
 * @param  {object} error     Return error from rejected request
 * @return {object}           Actioj
 */
export function rejectDeleteNamespace(namespace, error) {
    return {
        type: actions.DELETE_NAMESPACE_REJECTED,
        namespace,
        error,
    };
}


/**
 * requestHistory - Request history
 *
 * @return {object}  Action
 */
export function requestHistory() {
    return {
        type: actions.FETCH_HISTORY_PENDING,
    };
}


/**
 * recieveHistory - description
 *
 * @param  {string} namespace Namespace of requested history
 * @param  {string} key       Key of requested history
 * @param  {array} history    History array
 * @return {object}           Action
 */
export function recieveHistory(namespace, key, history) {
    return {
        type: actions.FETCH_HISTORY_FULFILLED,
        namespace,
        key,
        history,
    };
}


/**
 * rejectHistory - Reject request for history
 *
 * @param  {string} namespace Namespace of requested history
 * @param  {string} key       Key of requested history
 * @param  {object} error     Error return from rejected request
 * @return {object}           Action
 */
export function rejectHistory(namespace, key, error) {
    return {
        type: actions.FETCH_HISTORY_REJECTED,
        namespace,
        key,
        error,
    };
}


/**
 * recieveNamespaceHistory - Request history of namespace
 *
 * @param  {string} namespace Namespace of requested history
 * @param  {array} history    History of namespace
 * @return {object}           Action
 */
export function recieveNamespaceHistory(namespace, history) {
    return {
        type: actions.FETCH_NAMESPACE_HISTORY_FULFILLED,
        namespace,
        history,
    };
}


/**
 * rejectNamespaceHistory - Reject history request of namespace
 *
 * @param  {string} namespace Namespace of requested history
 * @param  {object} error     Error return from rejected request
 * @return {object}           Action
 */
export function rejectNamespaceHistory(namespace, error) {
    return {
        type: actions.FETCH_NAMESPACE_HISTORY_REJECTED,
        namespace,
        error,
    };
}


/**
 * valueChange - Signal a value chagne in edit display area
 *
 * @param  {type} namespace Namespace of value changed
 * @param  {type} key       Key of value changed
 * @param  {type} value     Change value
 * @return {type}           Action
 */
export function valueChange(namespace, key, value) {
    return {
        type: actions.VALUE_CHANGE,
        namespace,
        key,
        value,
    };
}


/**
 * toggleNamespace - Toggle namespace
 *
 * @param  {string} namespace Namespace toggled
 * @param  {bool} override    Override prop
 * @return {object}           Action
 */
export function toggleNamespace(namespace, override) {
    return {
        type: actions.TOGGLE_NAMESPACE,
        namespace,
        override,
    };
}


/**
 * selectKey - Select a key
 *
 * @param  {string} namespace Namespace holdinh key
 * @param  {string} key       Key selected
 * @param  {string} value     Value of selected key
 * @return {object}           Action
 */
export function selectKey(namespace, key, value) {
    return {
        type: actions.SELECT_KEY,
        namespace,
        key,
        value,
    };
}


 /**
  * fetchAndToggleNamespace - Fetches keys for a namespace and toggles the namespace
  *                           in the list. If the namespace is not found in the
  *                           API it will be removed from the list aswell.
  *
  * @param  {string} namespace             Namespace to get keys for.
  * @param  {string} openNamespace = false OpenNamespace overrides the toggling, if true it will always
  *                                        open regardless of previous state of the namespace.
  * @return {object}                       Action thunk
  */
export function fetchAndToggleNamespace(namespace, openNamespace = false) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return api.getKeys(namespace)
            .then(keys => {
                dispatch(recieveKeys(namespace, keys));
            })
            .then(() => dispatch(toggleNamespace(namespace, openNamespace)))
            .catch(error => {
                if (error.status === 404) { // If not found, we remove the namespace from UI
                    return dispatch(receiveDeleteNamespace(namespace));
                } else if (error) { // propagate error
                    throw error;
                }
                return null;
            })
            .catch(error => {
                dispatch(rejectKeys(namespace, error));
            });
    };
}


 /**
  * fetchAndDisplayKeyValue - Fetches a value for given key and namespace.
  *                           Selectkey will be called upon success, updating the
  *                           state with the value and the key.
  *
  * @param  {string} namespace Namespace containing key
  * @param  {string} key       Key containing value
  * @return {object}           Action thunk
  */
export function fetchAndDisplayKeyValue(namespace, key) {
    return dispatch => {
        dispatch(requestValue(namespace, key));
        return api.getValue(namespace, key)
            .then(value => {
                dispatch(recieveValue(namespace, key, value));
                dispatch(selectKey(namespace, key, value));
            })
            .catch(error => dispatch(rejectValue(namespace, key, error)));
    };
}


/**
 * @function fetchNamespaces
 * Intial fetching of namespaces
 * @returns action thunk
 */
export function fetchNamespaces() {
    return dispatch => {
        dispatch(requestNamespaces());
        return api.getNamespaces()
            .then(namespaces => {
                dispatch(recieveNamespaces(namespaces));
            })
            .catch(error => dispatch(rejectNamespaces(error)));
    };
}


 /**
  * createValue - Creates a value with key in namespace.
  *               Because of how the API behaves, this is used for both creating
  *               keys and namespaces. We always create a value with empty values, and instead use
  *               updateValue to update values.
  *               If a namespace exists, the key will be created in namespace with an empty value
  *               If both namespace and key exists; rejectCreateValue will be dispatched.
  *
  * @param  {object} namespace Namespace to create or add key in
  * @param  {object} key       Key for tied to value
  * @param  {object} value     Value to create
  * @return {string}           Action thunk
  */
export function createValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestCreateValue(namespace, key, value));
        return api.createValue(namespace, key, value)
            .then(() => dispatch(receivedCreateValue(namespace, key, value)));
    };
}


 /**
  * createAndDisplayValue - Creates a value with key in namespace.
  *                         On success, the namespace will be opened and the empty
  *                         value will be displayed. Note that this is used both for
  *                         creating namespaces and keys. See {@link createValue}
  *
  * @param  {string} namespace Namespace namespace to create or update
  * @param  {string} key       Key to create
  * @return {object}           Action thunk
  */
export function createAndDisplayValue(namespace, key) {
    return dispatch => {
        dispatch(createValue(namespace, key, {}))
            .then(() => hashHistory.push(`/edit/${namespace}/${key}`))
            .then(() => dispatch(fetchAndToggleNamespace(namespace, true)))
            .catch(error => dispatch(rejectCreateValue(namespace, key, {}, error)));
    };
}


/**
 * fetchKeys - Fetch keys
 *
 * @param  {string} namespace Fetch keys for given namespace
 * @return {object}           Action thunk
 */
export function fetchKeys(namespace) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return api.getKeys(namespace)
            .then(keys => {
                if(keys.length < 1) {
                    return Promise.reject({status: 404});
                }
                dispatch(recieveKeys(namespace, keys))
            })
    };
}


 /**
  * fetchHistory - Gets history for a key in a namespace
  *
  * @param  {string} namespace Namespace for key
  * @param  {string} key       Key in namespace
  * @return {object}           Action thunk
  */
export function fetchHistory(namespace, key) {
    return dispatch => {
        dispatch(requestHistory());
        return api.getHistoryOfKey(namespace, key)
            .then(history => {
                dispatch(recieveHistory(namespace, key, history));
            })
            .catch(error => {
                dispatch(rejectHistory(namespace, key, error));
            });
    };
}


/**
 * fetchHistoryForNamespace - Fetch history for namespace
 *
 * @param  {string} namespace Fetch histoory for given namespace
 * @return {object}           Action thunk
 */
export function fetchHistoryForNamespace(namespace) {
    return dispatch => {
        dispatch(requestHistory());
        return api.getHistoryOfNamespace(namespace)
            .then(history => {
                dispatch(recieveNamespaceHistory(namespace, history));
            })
            .catch(error => {
                dispatch(rejectNamespaceHistory(namespace, error));
            });
    };
}


 /**
  * updateValue - Updates a value with key in namespace.
  *
  * @param  {string} namespace Namespace containing value
  * @param  {string} key       Key to update
  * @param  {string} value     Value to update
  * @return {object}           Action thunk
  */
export function updateValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestUpdateValue(namespace, key, value));
        return api.updateValue(namespace, key, value)
            .then(() => dispatch(receiveUpdateValue(namespace, key, value)))
            .catch(() => dispatch(rejectUpdateValue(namespace, key, value)));
    };
}


/**
  * deleteKey - Deletes a key from the API and store.
  *             If it's the last key in the namespace, the namespace is
  *             removed aswell (following the behavior of the API).
  *
  * @param  {string} namespace Namespace containing the key to be removed
  * @param  {string} key       Key to be removed
  * @return {object}           action thunk
  */
export function deleteKey(namespace, key) {
    return dispatch => {
        dispatch(requestDeleteKey(namespace, key));
        return api.deleteValue(namespace, key)
            .then(() => dispatch(receiveDeleteKey(namespace, key)))
            .then(() => dispatch(fetchKeys(namespace)))
            .catch(error => {
                if (error.status === 404) { // If not found, we remove the namespace from UI
                    dispatch(receiveDeleteNamespace(namespace));
                } else if (error) { // Propagate error
                    throw error;
                } else { // togglenamespace if not last key
                    dispatch(toggleNamespace(namespace, true));
                }
            })
            .catch(error => {
                dispatch(rejectDeleteKey(namespace, key, error));
            });
    };
}


/**
 * deleteNamespace - Deletes a namespace from the state and API.
 *                   This will also delete all keys in the namespace.
 *
 * @param  {string} namespace Namesapce to delete
 * @return {object}           Action thunk
 */
export function deleteNamespace(namespace) {
    return dispatch => {
        dispatch(requestDeleteNamespace(namespace));
        return api.deleteNamespace(namespace)
            .then(success => {
                dispatch(receiveDeleteNamespace(namespace));
                return success;
            })
            .catch(() => dispatch(rejectDeleteNamespace(namespace)));
    };
}
