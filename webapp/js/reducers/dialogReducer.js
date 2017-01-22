import * as actions from '../constants/actionTypes';

const emptyDialog = { type: null, props: {} };
const initialState = {
    ...emptyDialog,
};

const dialog = (state = initialState, action) => {
    switch (action.type) {

    case actions.OPEN_DIALOG:
        {
            return {
                ...state,
                type: action.dialogType,
                props: action.dialogprops,
            };
        }


    case actions.CLOSE_DIALOG:
        {
            return {
                ...state,
                ...emptyDialog,
            };
        }

    default:
        {
            return {
                ...state,
            };
        }
    }
};

export default dialog;
