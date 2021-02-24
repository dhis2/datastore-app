import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import JSEditor from 'jsoneditor/dist/jsoneditor.min.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openDialog } from '../../actions/dialogActions'
import { jsonEditorChangeMode } from '../../actions/jsonEditorActions'
import * as dialogTypes from '../../constants/dialogTypes'
import 'jsoneditor/dist/jsoneditor.min.css'
import { sortObjectKeys } from '../../utils/utils'

/* eslint-disable react/prop-types */

const style = {
    backgroundColor: 'white',
    height: '100%',
}

export class JSONEditor extends Component {
    constructor(props) {
        super(props)
        this.editor = null
    }

    componentDidMount() {
        this.initEditor()
    }

    componentWillUnmount() {
        if (this.editor) {
            this.editor.destroy()
        }
    }

    /* Need custom update condition as we only re-render when switching keys/namespace .
     * The state of the editor is lost if we update the state without saving*/
    shouldComponentUpdate(nextProps) {
        const { namespace, selectedKey } = this.props
        return (
            namespace !== nextProps.namespace ||
            selectedKey !== nextProps.selectedKey
        )
    }

    /* Handle the jsonEditor props here, as if we re-render the component, the state is lost,
     * as it's inside the jsoneditor which is not a react-component. */
    UNSAFE_componentWillReceiveProps(nextProps) {
        for (const [key, value] of Object.entries(this.props.jsonEditor)) {
            if (nextProps.jsonEditor[key] !== value) {
                this.handleJsonEditor(nextProps)
                break
            }
        }
    }

    updateValue(value) {
        this.editor.set(sortObjectKeys(value))
    }

    UNSAFE_componentWillUpdate(nextProps) {
        this.updateValue(nextProps.value)
        this.handleJsonEditor(nextProps)
    }

    removeBuiltInMenu() {
        //Remove built-in menu
        if (
            this.editor &&
            this.editor.frame &&
            this.editor.frame.contains(this.editor.menu)
        ) {
            this.editor.frame.removeChild(this.editor.menu)
        }
    }

    changedEvent = () => {
        this.props.dataChanged(this.editor)
    }

    jsonEditorIsValid = () => {
        try {
            this.editor.get()
            return true
        } catch (e) {
            return false
        }
    }

    handleJsonEditor = props => {
        const {
            jsonSearchValue,
            collapse,
            expand,
            undo,
            redo,
            mode,
            compact,
            format,
        } = props.jsonEditor

        if (this.editor.getMode() !== 'code') {
            this.editor.search(jsonSearchValue || '')
            if (collapse) {
                this.editor.collapseAll()
            }

            if (expand) {
                this.editor.expandAll()
            }

            if (undo) {
                this.editor._onUndo()
            }

            if (redo) {
                this.editor._onRedo()
            }
        }

        if (this.editor.getMode() !== 'tree') {
            if (compact) {
                this.editor.compact()
            }

            if (format) {
                this.editor.format()
            }
        }

        if (this.editor.getMode() !== mode) {
            if (this.editor.options.mode === 'code') {
                if (this.jsonEditorIsValid()) {
                    this.editor.setMode(mode)
                } else {
                    this.props.openErrorMessage(
                        i18n.t(
                            'Invalid JSON. Please fix all remaining issues and try again.'
                        )
                    )
                    this.props.jsonChangeMode(this.editor.getMode())
                }
            }

            if (this.editor.options.mode !== 'code') {
                this.editor.setMode(mode)
            }
        }
        this.removeBuiltInMenu()
    }

    initEditor() {
        if (!this.editor && this.editorContainer) {
            const opts = {
                modes: ['tree', 'view', 'text', 'form'],
                onChange: this.changedEvent,
            }
            this.editor = new JSEditor(this.editorContainer, opts)
            this.removeBuiltInMenu()
            this.updateValue(this.props.value)
        }
    }

    render() {
        return (
            <div
                id="jsoneditor"
                style={style}
                ref={container => (this.editorContainer = container)}
            ></div>
        )
    }
}

JSONEditor.propTypes = {
    dataChanged: PropTypes.func,
    jsonChangeMode: PropTypes.func,
    value: PropTypes.any,
}

const mapStateToProps = state => ({
    jsonEditor: state.jsonEditor,
})

const mapDispatchToProps = dispatch => ({
    jsonChangeMode(mode) {
        dispatch(jsonEditorChangeMode(mode))
    },
    openErrorMessage(message) {
        dispatch(openDialog(dialogTypes.ERROR_DIALOG, { message }))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(JSONEditor)
