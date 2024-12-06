import { json } from '@codemirror/lang-json'
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror'
import React from 'react'

type PanelEditorProps = {
    handleChange?: (value: string, viewUpdate: ViewUpdate) => void
    value: string
}

const PanelEditor = ({ value, handleChange }: PanelEditorProps) => {
    return (
        <CodeMirror
            value={value}
            height="90vh"
            extensions={[json()]}
            onChange={handleChange}
        />
    )
}

export default PanelEditor
