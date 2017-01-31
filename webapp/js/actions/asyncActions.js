
/**
 * Fetches keys for a namespace and toggles the namespace
 * in the list.
 * If the namespace is not found in the API it will be removed
 * from the list aswell.
 * @param namespace to get keys for.
 * @param openNamespace overrides the toggling, if true it will always
 * open regardless of previous state of the namespace.
 * @returns action thunk
 */
export function fetchAndToggleNamespace(namespace, openNamespace = false) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return getApi.then(api => api.getKeys(namespace)
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
            }));
    };
}

/**
 * Fetches a value for given key and namespace.
 * Selectkey will be called upon success, updating the
 * state with the value and the key.
 * @param namespace containing key
 * @param key containing value
 * @returns action thunk
 */
export function fetchAndDisplayKeyValue(namespace, key) {
    return dispatch => {
        dispatch(requestValue(namespace, key));
        return getApi.then(api => api.getValue(namespace, key)
            .then(value => {
                dispatch(recieveValue(namespace, key, value));
                dispatch(selectKey(namespace, key, value));
            })
            .catch(error => dispatch(rejectValue(namespace, key, error))));
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
        return getApi.then(api => api.getNamespaces()
            .then(namespaces => {
                dispatch(recieveNamespaces(namespaces));
            })
            .catch(error => dispatch(rejectNamespaces(error))));
    };
}

/**
 * @function createValue
 * Creates a value with key in namespace.
 *
 * Because of how the API behaves, this is used for both creating
 * keys and namespaces. We always create a value with empty values, and instead use
 * updateValue to update values.
 * If a namespace exists, the key will be created in namespace with an empty value
 * If both namespace and key exists; rejectCreateValue will be dispatched.
 * @param namespace to create or add key in
 * @param key to create
 * @returns action thunk
 */
export function createValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestCreateValue(namespace, key, value));
        return getApi.then(api => api.createValue(namespace, key, value)
            .then(() => dispatch(receivedCreateValue(namespace, key, value))));
    };
}

/**
 * @function createAndDisplayValue
 * Creates a value with key in namespace.
 *
 * On success, the namespace will be opened and the empty
 * value will be displayed. Note that this is used both for
 * creating namespaces and keys. See {@link createValue}
 * @param namespace namespace to create or update
 * @param key to create
 * @returns action thunk
 */
export function createAndDisplayValue(namespace, key) {
    return dispatch => {
        dispatch(createValue(namespace, key, {}))
            .then(() => hashHistory.push(`/edit/${namespace}/${key}`))
            .then(() => dispatch(fetchAndToggleNamespace(namespace, true)))
            .catch(error => dispatch(rejectCreateValue(namespace, key, {}, error)));
    };
}

export function fetchKeys(namespace) {
    return dispatch => {
        dispatch(requestKeys(namespace));
        return getApi.then(api => api.getKeys(namespace)
            .then(keys => dispatch(recieveKeys(namespace, keys))));
    };
}

/**
 * Gets history for a key in a namespace
 * @param namespace for key
 * @param key in namespace
 * @returns action thunk
 */
export function fetchHistory(namespace, key) {
    return dispatch => {
        dispatch(requestHistory());
        return getApi.then(api => api.getHistoryOfKey(namespace, key)
            .then(history => {
                dispatch(recieveHistory(namespace, key, history));
            })
            .catch(error => {
                dispatch(rejectHistory(namespace, key, error));
            }));
    };
}

export function fetchHistoryForNamespace(namespace) {
    return dispatch => {
        dispatch(requestHistory());
        return getApi.then(api => api.getHistoryOfNamespace(namespace)
            .then(history => {
                dispatch(recieveNamespaceHistory(namespace, history));
            })
            .catch(error => {
                dispatch(rejectNamespaceHistory(namespace, error));
            }));
    };
}

/** @function updateValue
 *
 * Updates a value with key in namespace.
 * @param namespace containing value
 * @param key to update
 * @param value to update
 * @returns action thunk
 */
export function updateValue(namespace, key, value) {
    return dispatch => {
        dispatch(requestUpdateValue(namespace, key, value));
        return getApi.then(api => api.updateValue(namespace, key, value)
            .then(() => dispatch(receiveUpdateValue(namespace, key, value)))
            .catch(() => dispatch(rejectUpdateValue(namespace, key, value))));
    };
}

/**
 * Deletes a key from the API and store.
 * If it's the last key in the namespace, the namespace is
 * removed aswell (following the behavior of the API).
 * @param namespace containing the key to be removed
 * @param key to be removed
 * @returns action thunk
 */
export function deleteKey(namespace, key) {
    return dispatch => {
        dispatch(requestDeleteKey(namespace, key));
        return getApi.then(api => api.deleteValue(namespace, key)
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
            }));
    };
}

/**
 * Deletes a namespace from the state and API.
 * This will also delete all keys in the namespace.
 * @param namespace to delete
 * @returns action thunk
 */
export function deleteNamespace(namespace) {
    return dispatch => {
        dispatch(requestDeleteNamespace(namespace));
        return getApi.then(api => api.deleteNamespace(namespace)
            .then(success => {
                dispatch(receiveDeleteNamespace(namespace));
                return success;
            })
            .catch(() => dispatch(rejectDeleteNamespace(namespace))));
    };
}
