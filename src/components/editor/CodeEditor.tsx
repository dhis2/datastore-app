import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter, lintGutter } from '@codemirror/lint'
import { search } from '@codemirror/search'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'
import './editor-styles.css'
import { CODE_VIEW } from '../../constants/constants'
import { EditorValueProps } from '../sections/EditSection'

type CodeEditorProps = {
    value?: string
    onChange?: (param: EditorValueProps) => void
    loading: boolean
}

const CodeEditor = ({ value, onChange, loading }: CodeEditorProps) => {
    return (
        <CodeMirror
            theme={'dark'}
            value={value}
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
            onChange={(value) => onChange({ value, editor: CODE_VIEW })}
            autoFocus
            editable={!loading}
        />
    )
}

export default CodeEditor
