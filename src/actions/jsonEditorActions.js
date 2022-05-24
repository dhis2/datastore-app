import * as actions from '../constants/jsonEditorTypes.js'

/**
 * searchJSON - Search action in json editor
 *
 * @param  {string} value description
 * @return {object}       Action
 */
export function searchJSON(value) {
    return {
        type: actions.SEARCH_JSON,
        searchValue: value,
    }
}

/**
 * jsonEditorExpand - Expand json in json editor
 *
 * @return {object}  Action
 */
export function jsonEditorExpand() {
    return {
        type: actions.EXPAND_JSON,
    }
}

/**
 * jsonEditorCollapse - Collapse json in json editor
 *
 * @return {object}  Action
 */
export function jsonEditorCollapse() {
    return {
        type: actions.COLLAPSE_JSON,
    }
}

/**
 * jsonEditorCompact - Compact json in json editor
 *
 * @return {object}  Action
 */
export function jsonEditorCompact() {
    return {
        type: actions.COMPACT_JSON,
    }
}

/**
 * jsonEditorFormat - Format json in json editor
 *
 * @return {object}  Action
 */
export function jsonEditorFormat() {
    return {
        type: actions.FORMAT_JSON,
    }
}

/**
 * jsonEditorUndo - Undo change in json editor
 *
 * @return {object}  Action
 */
export function jsonEditorUndo() {
    return {
        type: actions.UNDO_JSON,
    }
}

/**
 * jsonEditorRedo - Redo change in json editor
 *
 * @return {object}  Action
 */
export function jsonEditorRedo() {
    return {
        type: actions.REDO_JSON,
    }
}

/**
 * jsonEditorChangeMode - Change edit mode in json editor
 *
 * @param  {string} mode Mode to change to
 * @return {object}      Action
 */
export function jsonEditorChangeMode(mode) {
    return {
        type: actions.CHANGE_JSON_MODE,
        mode,
    }
}
