import * as actions from '../constants/actionTypes.js'

const initalState = { ignoreNextConfirm: false }

const navigation = (state = initalState, action) => {
    switch (action.type) {
        case actions.SET_IGNORE_NEXT_CONFIRM_NAVIGATION: {
            return {
                ...state,
                ignoreNextConfirm: action.ignoreNextConfirm,
            }
        }
    }
    return state
}
export default navigation
