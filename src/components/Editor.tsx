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
            value={value}
            height="85vh"
            extensions={[json()]}
            onChange={handleChange}
        />
    )
}

export default Editor
