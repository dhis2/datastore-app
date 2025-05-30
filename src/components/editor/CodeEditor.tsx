import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter, lintGutter } from '@codemirror/lint'
import { search } from '@codemirror/search'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'
import './editor-styles.css'

type CodeEditorProps = {
    value?: string
    onChange?: (string) => void
}

const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
    return (
        <CodeMirror
            theme={'dark'}
            value={value}
            height="90vh"
            extensions={[
                json(),
                lintGutter(),
                search({
                    top: true,
                }),
                linter(jsonParseLinter(), {
                    delay: 500,
                }),
            ]}
            onChange={onChange}
            autoFocus
        />
    )
}

export default CodeEditor
