/* eslint-disable max-params */
// eslint-disable-next-line import/no-unresolved
import JsonViewEditor from '@uiw/react-json-view/editor'
import React from 'react'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import ErrorNotice from '../error/ErrorNotice'

const customTheme = {
    '--w-rjv-color': '#e16c73',
    '--w-rjv-key-number': '#818499',
    '--w-rjv-key-string': '#e16c73', // root, key,
    '--w-rjv-background-color': '#292c34',
    '--w-rjv-line-color': 'transparent', // line colour
    '--w-rjv-arrow-color': '#818499',
    '--w-rjv-edit-color': '',
    '--w-rjv-info-color': '#818499',
    '--w-rjv-update-color': '',
    '--w-rjv-copied-color': '',
    '--w-rjv-copied-success-color': '',
    '--w-rjv-curlybraces-color': '#acb4be',
    '--w-rjv-colon-color': '#acb4be',
    '--w-rjv-brackets-color': '#acb4be',
    '--w-rjv-ellipsis-color': '',
    '--w-rjv-quotes-color': '#eb6383',
    '--w-rjv-quotes-string-color': '#9bc181',
    // different data types - values
    '--w-rjv-type-string-color': '#9cba7d',
    '--w-rjv-type-int-color': '#e4c07c',
    '--w-rjv-type-float-color': '#e4c07c',
    '--w-rjv-type-bigint-color': '#e4c07c',
    '--w-rjv-type-boolean-color': '#d9985f',
    '--w-rjv-type-date-color': '#9cba7d',
    '--w-rjv-type-url-color': '#9cba7d',
    '--w-rjv-type-null-color': '#9cba7d',
    '--w-rjv-type-nan-color': '#9cba7d',
    '--w-rjv-type-undefined-color': '#9cba7d',
}

const treeEditorStyle = {
    ...customTheme,
    fontSize: '17px',
    fontFamily:
        "ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono','Roboto Mono', 'Oxygen Mono', 'Ubuntu Mono', 'Source Code Pro','Fira Mono', 'Droid Sans Mono', 'Consolas','Courier New', monospace",
}

const retrieveSelectedValue = ({ mainObj, path }) => {
    let selectedValue = mainObj
    const lastKey = path[path.length - 1]

    if (path.length > 0) {
        for (let i = 0; i < path.length - 1; i++) {
            selectedValue = selectedValue[path[i]]
        }
    }

    return {
        selectedValue,
        lastKey,
    }
}

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
                    const temp = selectedValue[oldValue]

                    if (oldValue === 'AddKeyOrValue' && temp === undefined) {
                        selectedValue[value] = ''
                    } else {
                        selectedValue[value] = temp
                        delete selectedValue[oldValue]
                    }
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
                onAdd={(_kv, _nv, _v, isAdd) => isAdd}
            />
        </div>
    )
}

export default TreeViewEditor
