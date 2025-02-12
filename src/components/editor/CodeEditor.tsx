import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter, lintGutter } from '@codemirror/lint'
import { search } from '@codemirror/search'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'

type CodeEditorProps = {
    onChange: (value: string) => void
    initialData: string
}

const CodeEditor = ({ initialData: value, onChange }: CodeEditorProps) => {
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
                    delay: 1000,
                }),
            ]}
            onChange={onChange}
            autoFocus
        />
    )
}

export default CodeEditor
