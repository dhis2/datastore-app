import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter, lintGutter } from '@codemirror/lint'
import { search } from '@codemirror/search'
import CodeMirror from '@uiw/react-codemirror'
import React, { useMemo } from 'react'
import './editor-styles.css'

type CodeEditorProps = {
    value?: string
    onChange?: (string) => void
    loading: boolean
}

const CodeEditor = ({ value, onChange, loading }: CodeEditorProps) => {
    const codeEditorValue = useMemo(
        () => JSON.stringify(value, null, 4),
        [value]
    )

    return (
        <CodeMirror
            theme={'dark'}
            value={codeEditorValue}
            height="80vh"
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
            editable={!loading}
        />
    )
}

export default CodeEditor
