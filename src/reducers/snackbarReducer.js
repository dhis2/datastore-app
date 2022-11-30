import * as actions from '../constants/actionTypes.js'

const emptySnackbar = { snackbarMessage: { message: '' } }
const initialState = {}

const snackbar = (state = initialState, action) => {
    switch (action.type) {
        case actions.SELECT_KEY: {
            return {
                ...emptySnackbar,
            }
        }

        case actions.UPDATE_VALUE_FULFILLED: {
            return {
                ...state,
                message: 'Value saved.',
            }
        }

        case actions.UPDATE_VALUE_REJECTED: {
            let msg = 'Failed to save.'

            const { error } = action

            if (error && typeof error === 'string') {
                msg = action.error
            }

            return {
                ...state,
                message: msg,
            }
        }

        case actions.FORMAT_VALUE_REJECTED: {
            const msg = action.error || 'Failed to format'

            return {
                ...state,
                message: msg,
            }
        }

        case actions.FETCH_KEYS_REJECTED: {
            return {
                ...state,
                message: action.error,
            }
        }

        case actions.DELETE_KEY_FULFILLED: {
            return {
                ...state,
                message: 'Key deleted.',
            }
        }

        case actions.DELETE_NAMESPACE_FULFILLED: {
            return {
                ...state,
                message: 'Namespace deleted.',
            }
        }

        case actions.CREATE_VALUE_REJECTED: {
            let message = 'Failed to create. '
            if (action.error && action.error.message) {
                message += action.error.message
            }
            return {
                ...state,
                message,
            }
        }

        case actions.SNACKBAR_EMPTY: {
            return {
                ...emptySnackbar,
            }
        }

        default: {
            return {
                ...state,
            }
        }
    }
}

export default snackbar
