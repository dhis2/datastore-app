import * as actions from '../constants/actionTypes.js'

const emptyDialog = { dialogType: null }
const initialState = {
    ...emptyDialog,
}

const dialog = (state = initialState, action) => {
    switch (action.type) {
        case actions.OPEN_DIALOG: {
            const { dialogType, dialogprops } = action
            return {
                ...state,
                dialogType,
                ...dialogprops,
            }
        }

        case actions.CLOSE_DIALOG: {
            return {
                ...state,
                ...emptyDialog,
            }
        }

        default: {
            return state
        }
    }
}

export default dialog
