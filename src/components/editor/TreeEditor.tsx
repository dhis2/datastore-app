/* 
    Library of use: https://uiwjs.github.io/react-json-view/
    Pending: edit functionality
*/

import JsonView from '@uiw/react-json-view'
// eslint-disable-next-line import/no-unresolved
import { TriangleSolidArrow } from '@uiw/react-json-view/triangle-solid-arrow'
import React from 'react'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'

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

const TreeViewEditor = ({ data }: { data: string }) => {
    const { showError } = useCustomAlert()
    const formattedData = () => {
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
            showError(i18n.t('Invalid JSON - {{error}}', { error: e.message }))
        }
    }

    return (
        <div
            style={{
                overflowY: 'auto',
                height: '100%',
            }}
        >
            <JsonView
                value={formattedData()}
                keyName={'object'}
                shortenTextAfterLength={0}
                style={{
                    ...customTheme,
                    fontSize: '16px',
                    fontFamily: 'Roboto, sans-serif',
                    height: '100%',
                }}
                displayDataTypes={false}
                collapsed={1}
                indentWidth={30}
            >
                <JsonView.Arrow>
                    <TriangleSolidArrow />
                </JsonView.Arrow>
            </JsonView>
        </div>
    )
}

export default TreeViewEditor
