import { json } from '@codemirror/lang-json'
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror'
import React from 'react'

type EditorProps = {
    handleChange?: (value: string, viewUpdate: ViewUpdate) => void
    value?: string
    active: boolean
}

const Editor = ({ value, handleChange, active }: EditorProps) => {
    return (
        <CodeMirror
            theme={'dark'}
            value={value}
            height="100vh"
            extensions={[json()]}
            onChange={handleChange}
            readOnly={!active}
            editable={active}
            autoFocus={active}
        />
    )
}

export default Editor
