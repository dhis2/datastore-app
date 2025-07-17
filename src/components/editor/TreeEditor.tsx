// eslint-disable-next-line import/no-unresolved
import JsonViewEditor from '@uiw/react-json-view/editor'
import React from 'react'
import { CUSTOM_KEY_NAME } from '../../constants/constants'
import i18n from '../../locales'
import { findAndReplaceLibraryDefaultKeyAndValues } from '../../utils/treeEditor/customiseLibraryHelpers'
import {
    findReferenceToParentValue,
    getKeyToUpdate,
    getPathToTarget,
    validateObject,
} from '../../utils/treeEditor/treeEditorUtils'
import ErrorNotice from '../error/ErrorNotice'
import { treeEditorStyle } from './treeEditorTheme'

const TreeViewEditor = ({
    value: treeEditorValue,
    onChange,
    error,
    loading,
}: {
    value: object
    onChange?: (string) => void
    error?: string
    loading: boolean
}) => {
    const handleDelete = (keyName, _value, parentValue) => {
        // bypass library's delete functionality and handle it here
        // return false
        if (Array.isArray(parentValue)) {
            parentValue.splice(keyName, 1)
        } else if (keyName in parentValue) {
            delete parentValue[keyName]
        }
        onChange?.(JSON.stringify(treeEditorValue, null, 4))
        // onChange?.(treeEditorValue)
        return false
    }

    const handleEdit = ({ value, oldValue, type, namespace }) => {
        // modify library's edit functionality
        // return false
        const keyToUpdate = getKeyToUpdate({ path: namespace })
        const selectedValue = findReferenceToParentValue({
            mainObj: treeEditorValue,
            path: namespace,
        })

        if (type === 'key') {
            const keyAlreadyExists = Object.keys(selectedValue).includes(value)
            const hasChanges = oldValue !== value
            if (hasChanges && !keyAlreadyExists) {
                selectedValue[value] = selectedValue[oldValue]
                delete selectedValue[oldValue]
            }
        } else if (type === 'value') {
            try {
                selectedValue[keyToUpdate] = JSON.parse(value)
            } catch {
                selectedValue[keyToUpdate] = value
            }
        }
        onChange?.(JSON.stringify(treeEditorValue, null, 4))
        // onChange?.(treeEditorValue)
        return false
    }

    // eslint-disable-next-line max-params
    const handleAdd = (keyOrValue, newValue, value, isAdd) => {
        // customise library's add functionality
        const oldValue = validateObject({
            obj: value,
            label: keyOrValue,
        })

        let updatedValue = validateObject({
            obj: newValue,
            label: keyOrValue,
        })

        updatedValue = findAndReplaceLibraryDefaultKeyAndValues({
            value: updatedValue,
            defaultLabel: keyOrValue,
            newKeyName: CUSTOM_KEY_NAME,
        })

        const path = getPathToTarget(treeEditorValue, oldValue)

        if (path === null) {
            return false
        }

        if (path.length === 0) {
            treeEditorValue = updatedValue
        } else {
            const keyToUpdate = getKeyToUpdate({ path })
            const selectedValue = findReferenceToParentValue({
                mainObj: treeEditorValue,
                path: path,
            })
            selectedValue[keyToUpdate] = updatedValue
        }

        onChange?.(JSON.stringify(treeEditorValue, null, 4))
        // onChange?.(treeEditorValue)
        return isAdd
    }

    return error ? (
        <ErrorNotice
            message={i18n.t(
                'Invalid JSON detected. Fix the value in the Code Editor'
            )}
        />
    ) : (
        <div
            style={{
                overflow: 'auto',
                height: '80vh',
            }}
        >
            <JsonViewEditor
                value={treeEditorValue}
                shortenTextAfterLength={0}
                style={treeEditorStyle}
                displayDataTypes={false}
                displayObjectSize={true}
                collapsed={1}
                indentWidth={40}
                editable={!loading}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAdd={handleAdd}
            />
        </div>
    )
}

export default TreeViewEditor
