import * as actions from 'constants/actionTypes';

export function searchSidebarChange(value) {
    return {
        type: actions.SEARCH_VALUE_CHANGE,
        searchValue: value,
    };
}

export function recieveNamespaces(namespaces) {
    return {
        type: actions.FETCH_NAMESPACES_FULFILLED,
        namespaces,
    };
}

export function rejectNamespaces(error) {
    return {
        type: actions.FETCH_NAMESPACES_REJECTED,
        error,
    };
}

export function requestNamespaces() {
    return {
        type: actions.FETCH_NAMESPACES_PENDING,
    };
}

export function recieveKeys(namespace, keys) {
    return {
        type: actions.FETCH_KEYS_FULFILLED,
        namespace,
        keys,
    };
}

export function requestKeys(namespace) {
    return {
        type: actions.FETCH_KEYS_PENDING,
        namespace,
    };
}

export function rejectKeys(namespace, error) {
    return {
        type: actions.FETCH_KEYS_REJECTED,
        namespace,
        error,
    };
}

export function recieveValue(namespace, key, value) {
    return {
        type: actions.FETCH_VALUE_FULFILLED,
        namespace,
        key,
        value,
    };
}

export function requestValue(namespace, key) {
    return {
        type: actions.FETCH_VALUE_PENDING,
        namespace,
        key,
    };
}

export function rejectValue(namespace, key, error) {
    return {
        type: actions.FETCH_VALUE_REJECTED,
        namespace,
        key,
        error,
    };
}

export function receivedCreateValue(namespace, key, value) {
    return {
        type: actions.CREATE_VALUE_FULFILLED,
        namespace,
        key,
        value,
    };
}

export function requestCreateValue(namespace, key, value) {
    return {
        type: actions.CREATE_VALUE_PENDING,
        namespace,
        key,
        value,
    };
}

export function rejectCreateValue(namespace, key, value, error) {
    return {
        type: actions.CREATE_VALUE_REJECTED,
        namespace,
        key,
        value,
        error,
    };
}

export function requestUpdateValue(namespace, key, value) {
    return {
        type: actions.UPDATE_VALUE_PENDING,
        namespace,
        key,
        value,
    };
}

export function receiveUpdateValue(namespace, key, value) {
    return {
        type: actions.UPDATE_VALUE_FULFILLED,
        namespace,
        key,
        value,
    };
}

export function rejectUpdateValue(namespace, key, value, error) {
    return {
        type: actions.UPDATE_VALUE_REJECTED,
        namespace,
        key,
        value,
        error,
    };
}

export function requestDeleteKey(namespace, key) {
    return {
        type: actions.DELETE_KEY_PENDING,
        namespace,
        key,
    };
}

export function receiveDeleteKey(namespace, key) {
    return {
        type: actions.DELETE_KEY_FULFILLED,
        namespace,
        key,
    };
}

export function rejectDeleteKey(namespace, key, error) {
    return {
        type: actions.DELETE_KEY_REJECTED,
        namespace,
        key,
        error,
    };
}

export function requestDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_PENDING,
        namespace,
    };
}

export function receiveDeleteNamespace(namespace) {
    return {
        type: actions.DELETE_NAMESPACE_FULFILLED,
        namespace,
    };
}

export function rejectDeleteNamespace(namespace, error) {
    return {
        type: actions.DELETE_NAMESPACE_REJECTED,
        namespace,
        error,
    };
}

export function requestHistory() {
    return {
        type: actions.FETCH_HISTORY_PENDING,
    };
}

export function recieveHistory(namespace, key, history) {
    return {
        type: actions.FETCH_HISTORY_FULFILLED,
        namespace,
        key,
        history,
    };
}

export function rejectHistory(namespace, key, error) {
    return {
        type: actions.FETCH_HISTORY_REJECTED,
        namespace,
        key,
        error,
    };
}

export function recieveNamespaceHistory(namespace, history) {
    return {
        type: actions.FETCH_NAMESPACE_HISTORY_FULFILLED,
        namespace,
        history,
    };
}

export function rejectNamespaceHistory(namespace, error) {
    return {
        type: actions.FETCH_NAMESPACE_HISTORY_REJECTED,
        namespace,
        error,
    };
}

export function valueChange(namespace, key, value) {
    return {
        type: actions.VALUE_CHANGE,
        namespace,
        key,
        value,
    };
}

export function toggleNamespace(namespace, override) {
    return {
        type: actions.TOGGLE_NAMESPACE,
        namespace,
        override,
    };
}

export function selectKey(namespace, key, value) {
    return {
        type: actions.SELECT_KEY,
        namespace,
        key,
        value,
    };
}
