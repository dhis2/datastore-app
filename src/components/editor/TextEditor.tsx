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
  // const textEditorValue = useMemo(() => {
  //       if (typeof value === 'string') {
  //           return value
  //       } else {
  //           return JSON.stringify(value, null, 4)
  //       }
  //   }, [value])

    return (
        <CodeMirror
            theme={'dark'}
            value={value}
            height="80vh"
            extensions={[
                search({
                    top: true,
                }),
            ]}
            onChange={onChange}
            autoFocus
            editable={!loading}
        />
    )
}

export default TextEditor
