import { lintGutter } from '@codemirror/lint'
import { search } from '@codemirror/search'
import CodeMirror from '@uiw/react-codemirror'
import React, { useMemo } from 'react'
import './editor-styles.css'
import { TEXT_VIEW } from '../../constants/constants'
import { EditorValueProps } from '../sections/EditSection'

type TextEditorProps = {
    value?: string
    onChange?: (param: EditorValueProps) => void
    loading: boolean
}

const TextEditor = ({ value, onChange, loading }: TextEditorProps) => {
    const textEditorValue = useMemo(() => {
        try {
            return JSON.parse(value)
        } catch {
            return value
        }
    }, [value])

    return (
        <CodeMirror
            theme={'dark'}
            value={textEditorValue}
            height="80vh"
            extensions={[
                search({
                    top: true,
                }),
                lintGutter(),
            ]}
            onChange={(value) => {
                return onChange({
                    value,
                    editor: TEXT_VIEW,
                })
            }}
            autoFocus
            editable={!loading}
        />
    )
}

export default TextEditor
