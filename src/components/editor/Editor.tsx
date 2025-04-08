import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter, lintGutter } from '@codemirror/lint'
import { search } from '@codemirror/search'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import React from 'react'
import './editor-styles.css'
import { useEditContext } from '../context/EditContext'

type EditorProps = {
    value?: string
    setEditorView?: (view: EditorView) => void
}

const Editor = ({ value, setEditorView }: EditorProps) => {
    const { setHasUnsavedChanges } = useEditContext()

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
            onChange={() => setHasUnsavedChanges(true)}
            onCreateEditor={(view) => setEditorView(view)}
            autoFocus
        />
    )
}

export default Editor
