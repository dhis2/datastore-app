/* eslint-disable max-params */
// eslint-disable-next-line import/no-unresolved
import JsonViewEditor from '@uiw/react-json-view/editor'
import React from 'react'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import {
    findPath,
    retrieveSelectedValue,
    treeEditorStyle,
} from '../../utils/treeEditorUtils'
import ErrorNotice from '../error/ErrorNotice'

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
            const { selectedValue, lastKey } = retrieveSelectedValue({
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
            const { selectedValue, lastKey } = retrieveSelectedValue({
                mainObj: treeEditorValue,
                path: namespace,
            })

            if (type === 'key') {
                if (oldValue === value) {
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
        const path = findPath(treeEditorValue, value)

        if (path === null) {
            return
        }

        const { selectedValue, lastKey } = retrieveSelectedValue({
            mainObj: treeEditorValue,
            path: path,
        })

        if (Array.isArray(newValue)) {
            const index = newValue.findIndex((el) => el === keyOrValue)
            newValue[index] = null
        } else {
            newValue[keyOrValue] = null
        }

        if (lastKey !== null) {
            selectedValue[lastKey] = newValue
        } else if (Array.isArray(selectedValue)) {
            selectedValue.push(null)
        } else {
            selectedValue[keyOrValue] = null
        }

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
