import { lintGutter } from '@codemirror/lint'
import { search } from '@codemirror/search'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'
import './editor-styles.css'

type TextEditorProps = {
    value?: string
    onChange?: (string) => void
    loading: boolean
}

const TextEditor = ({ value, onChange, loading }: TextEditorProps) => {
    return (
        <CodeMirror
            theme={'dark'}
            value={value}
            height="80vh"
            extensions={[
                search({
                    top: true,
                }),
                lintGutter(),
            ]}
            onChange={(value) => onChange(JSON.stringify(value, null, 4))}
            autoFocus
            editable={!loading}
        />
    )
}

export default TextEditor
