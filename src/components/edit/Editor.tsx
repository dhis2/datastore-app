import { json } from '@codemirror/lang-json'
import CodeMirror from '@uiw/react-codemirror'
import PropTypes from 'prop-types'
import React from 'react'

const Editor = ({ value, handleChange }) => {
    return (
        <CodeMirror
            value={value}
            height="80vh"
            extensions={[json()]}
            onChange={handleChange}
        />
    )
}

Editor.propTypes = {
    handleChange: PropTypes.func,
    value: PropTypes.string,
}

export default Editor
