// eslint-disable-next-line import/no-unresolved
import JsonViewEditor from '@uiw/react-json-view/editor'
import React, { useMemo, useState } from 'react'
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
    height: '100%',
    fontFamily:
        "ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono','Roboto Mono', 'Oxygen Mono', 'Ubuntu Mono', 'Source Code Pro','Fira Mono', 'Droid Sans Mono', 'Consolas','Courier New', monospace",
}

const TreeViewEditor = ({ data }: { data: string }) => {
    // Todo: edit functionality pending
    const [error, setError] = useState(null)
    const formattedData = useMemo(() => {
        setError(null)
        try {
            if (data === null || data === undefined) {
                return {}
            }
            const jsonValue = JSON.parse(data)

            if (typeof jsonValue === 'object') {
                return jsonValue
            } else {
                return { value: jsonValue }
            }
        } catch (e) {
            setError(e.message)
        }
    }, [data])

    return error ? (
        <ErrorNotice
            message={i18n.t(
                'Invalid JSON detected. Fix the value in the Code Editor'
            )}
        />
    ) : (
        <div
            style={{
                overflowY: 'auto',
                height: '100%',
            }}
        >
            <JsonViewEditor
                value={formattedData}
                shortenTextAfterLength={0}
                style={treeEditorStyle}
                displayDataTypes={false}
                displayObjectSize={true}
                collapsed={1}
                indentWidth={40}
            />
        </div>
    )
}

export default TreeViewEditor
