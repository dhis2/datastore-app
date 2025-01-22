import { json } from '@codemirror/lang-json'
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror'
import React from 'react'

type EditorProps = {
    handleChange?: (value: string, viewUpdate: ViewUpdate) => void
    value: string
}

const Editor = ({ value, handleChange }: EditorProps) => {
    return (
        <CodeMirror
            theme={'dark'}
            value={value}
            height="100vh"
            extensions={[json()]}
            onChange={handleChange}
        />
    )
}

export default Editor
