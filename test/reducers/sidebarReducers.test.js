import { expect } from 'chai';
import reducer from '../../webapp/js/reducers/sidebarReducer';

const fetchedState = { fetching: false, fetched: true, error: false };
const fetchingState = { fetching: true, fetched: false, error: false };
const errorState = { fetching: false, fetched: false, error: true };

describe('Sidebar Reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            searchValue: '',
            history: [],
            fetching: false,
            fetched: false,
            namespaces: { },
        };
    });

    it('Should handle SEARCH_VALUE_CHANGE', () => {
        const action = {
            type: 'SEARCH_VALUE_CHANGE',
            searchValue: 'test',
        };

        const expectedResult = {
            ...initialState,
            searchValue: 'test',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle TOGGLE_NAMESPACE', () => {
        const action = {
            type: 'TOGGLE_NAMESPACE',
            namespace: 'test',
            override: true,
        };

        const expectedResult = {
            ...initialState,
            namespaces: {
                test: {
                    open: true,
                },
            },
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_NAMESPACES_FULFILLED', () => {
        const action = {
            type: 'FETCH_NAMESPACES_FULFILLED',
            namespaces: ['test'],
        };

        const expectedResult = {
            ...initialState,
            ...fetchedState,
            namespaces: {
                test: {
                    keys: { },
                    name: 'test',
                    open: false,
                },
            },
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_NAMESPACES_PENDING', () => {
        const action = {
            type: 'FETCH_NAMESPACES_PENDING',
        }
        const expectedResult = {
            ...initialState,
            ...fetchingState,
        };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_NAMESPACES_REJECTED', () => {
        const action = {
            type: 'FETCH_NAMESPACES_REJECTED',
        };
        const expectedResult = {
            ...initialState,
            ...errorState,
        };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_KEYS_FULFILLED', () => {
        const action = {
            type: 'FETCH_KEYS_FULFILLED',
            namespace: 'test',
            keys: ['test'],
        };
        const expectedResult = {
            ...initialState,
            namespaces: {
                test: {
                    ...fetchedState,
                    keys: {
                        test: {
                            key: 'test',
                        },
                    },
                },
            },
        };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_KEYS_PENDING', () => {
        const action = {
            type: 'FETCH_KEYS_PENDING',
            namespace: 'test',
        };
        const expectedResult = {
            ...initialState,
            namespaces: {
                test: {
                    ...fetchingState,
                },
            },
        };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_KEYS_REJECTED', () => {
        const action = {
            type: 'FETCH_KEYS_REJECTED',
            namespace: 'testNamespace',
            error: 'testError',
        };
        const expectedResult = {
            ...initialState,
            namespaces: {
                testNamespace: {
                    ...errorState,
                    errorMessage: 'testError',
                },
            },
        };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle FETCH_VALUE_FULFILLED', () => {
        const action = {
            type: 'FETCH_VALUE_FULFILLED',
            namespace: 'testNamespace',
            key: 'testKey',
            value: 'testValue',
        };
        const expectedResult = {
            ...initialState,
            ...fetchedState,
            namespaces: {
                testNamespace: {
                    name: 'testNamespace',
                    open: false,
                    keys: {
                        testKey: {
                            key: 'testKey',
                            value: {},
                        },
                    },
                },
            },
        };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle CREATE_VALUE_FULFILLED', () => {
        const action = {
            type: 'CREATE_VALUE_FULFILLED',
            namespace: 'testNamespace',
            key: 'testKey',
            value: 'testValue',
        };
        const expectedResult = {
            ...initialState,
            ...fetchedState,
            namespaces: {
                testNamespace: {
                    name: 'testNamespace',
                    open: false,
                    keys: {
                        testKey: {
                            key: 'testKey',
                            value: {},
                        },
                    },
                },
            },
        };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle SELECT_KEY', () => {
        const action = {
            type: 'SELECT_KEY',
            namespace: 'testNamespace',
            key: 'testKey',
            value: 'testValue',
        };
        const expectedResult = {
            ...initialState,
            namespace: action.namespace,
            key: action.key,
            value: action.value,
            editedValue: action.value,
        };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle DELETE_NAMESPACE_FULFILLED', () => {
        const action = {
            type: 'DELETE_NAMESPACE_FULFILLED',
            namespace: 'testNamespace',
        };
        const expectedResult = {
            ...initialState,
            namespaces: {
            },
        };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle DELETE_KEY_FULFILLED', () => {
        const action = {
            type: 'DELETE_KEY_FULFILLED',
            namespace: 'testNamespace',
            key: 'testKey',
        };

        const modifiedInitialState = {
            ...initialState,
            namespaces: {
                testNamespace: {
                    name: 'testNamespace',
                    keys: {
                        testKey: { },
                    },
                },
            },
        };

        const expectedResult = {
            ...modifiedInitialState,
            namespaces: {
                testNamespace: {
                    name: 'testNamespace',
                    keys: { },
                },
            },
        };
        const newState = reducer(modifiedInitialState, action);
        expect(newState).to.eql(expectedResult);
    });
});
