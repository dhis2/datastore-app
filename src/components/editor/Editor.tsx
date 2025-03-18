import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter, lintGutter } from '@codemirror/lint'
import { search } from '@codemirror/search'
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror'
import React from 'react'
import { activeLine } from './EditorActiveLinePanel'

type EditorProps = {
    handleChange?: (value: string, viewUpdate: ViewUpdate) => void
    value?: string
}

const Editor = ({ value, handleChange }: EditorProps) => {
    return (
        <CodeMirror
            theme={'dark'}
            value={value}
            height="100vh"
            extensions={[
                json(),
                lintGutter(),
                search({
                    top: true,
                }),
                linter(jsonParseLinter(), {
                    delay: 500,
                }),
                activeLine(),
            ]}
            onChange={handleChange}
            autoFocus
        />
    )
}

export default Editor
