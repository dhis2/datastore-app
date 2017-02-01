import * as actions from 'constants/jsonEditorTypes';

export function searchJSON(value) {
    return {
        type: actions.SEARCH_JSON,
        searchValue: value,
    }
}

export function jsonEditorExpand() {
    return {
        type: actions.EXPAND_JSON,
    }
}

export function jsonEditorCollapse() {
    return {
        type: actions.COLLAPSE_JSON,
    }
}

export function jsonEditorCompact() {
    return {
        type: actions.COMPACT_JSON,
    }
}

export function jsonEditorFormat() {
    return {
        type: actions.FORMAT_JSON,
    }
}

export function jsonEditorUndo() {
    return {
        type: actions.UNDO_JSON,
    }
}

export function jsonEditorRedo() {
    return {
        type: actions.REDO_JSON,
    }
}

export function jsonEditorChangeMode(mode) {
    return {
        type: actions.CHANGE_JSON_MODE,
        mode,
    }
}
