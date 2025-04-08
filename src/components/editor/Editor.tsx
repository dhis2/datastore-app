import { history } from '@codemirror/commands'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter, lintGutter } from '@codemirror/lint'
import { search } from '@codemirror/search'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'
import './editor-styles.css'
import { useEditContext } from '../context/EditContext'

type EditorProps = {
    value?: string
}

const Editor = ({ value }: EditorProps) => {
    const { setEditorView, setHasUnsavedChanges } = useEditContext()

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
                history(),
            ]}
            onChange={() => setHasUnsavedChanges(true)}
            onCreateEditor={(view) => setEditorView(view)}
            autoFocus
        />
    )
}

export default Editor
