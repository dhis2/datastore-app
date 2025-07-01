/* eslint-disable max-params */
// eslint-disable-next-line import/no-unresolved
import JsonViewEditor from '@uiw/react-json-view/editor'
import React from 'react'
import { CUSTOM_KEY_NAME } from '../../constants/constants'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import { findAndReplaceLibraryDefaultKeyAndValues } from '../../utils/treeEditor/customiseLibraryHelpers'
import {
    findReferenceToParentValue,
    findReferenceToValueToUpdate,
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
    const { showError } = useCustomAlert()

    const handleDelete = (_v, _k, _l, opt) => {
        try {
            const { selectedValue, lastKey } = findReferenceToValueToUpdate({
                mainObj: treeEditorValue,
                path: opt.namespace,
            })

            if (typeof lastKey === 'number') {
                // delete array item
                selectedValue?.splice(lastKey, 1)
            } else {
                delete selectedValue[lastKey]
            }
            onChange?.(JSON.stringify(treeEditorValue, null, 4))
            return true
        } catch {
            return false
        }
    }

    const handleEdit = ({ value, oldValue, type, namespace }) => {
        try {
            const { selectedValue, lastKey } = findReferenceToValueToUpdate({
                mainObj: treeEditorValue,
                path: namespace,
            })

            if (type === 'key') {
                const keyAlreadyExists =
                    Object.keys(selectedValue).includes(value)
                const noChange = oldValue === value
                if (noChange || keyAlreadyExists) {
                    return false
                } else {
                    selectedValue[value] = selectedValue[oldValue]
                    delete selectedValue[oldValue]
                }
            } else if (type === 'value') {
                try {
                    selectedValue[lastKey] = JSON.parse(value)
                } catch {
                    showError(
                        i18n.t(
                            'There was an error parsing this value. Fix in the code editor.'
                        )
                    )
                    // console.log(e?.message)
                }
            }
            onChange?.(JSON.stringify(treeEditorValue, null, 4))
            return true
        } catch {
            return false
        }
    }

    const handleAdd = (keyOrValue, newValue, value, isAdd) => {
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
            onChange?.(JSON.stringify(updatedValue, null, 4))
            return isAdd
        }

        const keyToUpdate = getKeyToUpdate({ path })
        const selectedValue = findReferenceToParentValue({
            mainObj: treeEditorValue,
            path: path,
        })

        selectedValue[keyToUpdate] = updatedValue

        onChange?.(JSON.stringify(treeEditorValue, null, 4))
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
