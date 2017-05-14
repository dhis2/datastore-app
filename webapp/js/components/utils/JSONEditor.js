import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import JSEditor from 'jsoneditor/dist/jsoneditor.min.js';
import { jsonEditorChangeMode } from 'actions/jsonEditorActions';
import { openErrorDialog } from 'actions/dialogActions';
import '../../../style/vendor/jsoneditor.css';

export class JSONEditor extends Component {

    constructor(props) {
        super(props);
        this.editor = null;

        this.changedEvent = this.changedEvent.bind(this);
        this.handleJsonEditor = this.handleJsonEditor.bind(this);
        this.jsonEditorIsValid = this.jsonEditorIsValid.bind(this);
    }

    componentDidMount() {
        this.initEditor();
    }

    /* Need custom update condition as we only re-render when the value changes.*/
    shouldComponentUpdate(nextProps) {
        this.handleJsonEditor(nextProps);
        return this.props.value !== nextProps.value;
    }

    componentWillUpdate(nextProps) {
        this.editor.set(nextProps.value);
    }

    changedEvent() {
        this.props.dataChanged(this.editor);
    }

    jsonEditorIsValid() {
        try {
            this.editor.get();
            return true;
        } catch (e) {
            return false;
        }
    }

    handleJsonEditor(props) {
        const { search, collapse, expand, undo, redo, mode, compact, format } = props;

        if (this.editor.getMode() !== 'code') {
            this.editor.search(search || '');
            if (collapse) {
                this.editor.collapseAll();
            }

            if (expand) {
                this.editor.expandAll();
            }

            if (undo) {
                this.editor._onUndo();
            }

            if (redo) {
                this.editor._onRedo();
            }
        }

        if (this.editor.getMode() !== 'tree') {
            if (compact) {
                this.editor.compact();
            }

            if (format) {
                this.editor.format();
            }
        }

        if (this.editor.getMode() !== mode) {
            if (this.editor.options.mode === 'code') {
                if (this.jsonEditorIsValid()) {
                    this.editor.setMode(mode);
                } else {
                    this.props.openErrorMessage('There seems to be an issue with your json, please fix all remaining issues and try again');
                    this.props.jsonChangeMode(this.editor.getMode());
                }
            }

            if (this.editor.options.mode !== 'code') {
                this.editor.setMode(mode);
            }
        }
    }

    initEditor() {
        if (!this.editor && this.editorContainer) {
            const opts = {
                modes: ['tree', 'view', 'text', 'form'],
                onChange: this.changedEvent,
            };
            this.editor = new JSEditor(this.editorContainer, opts);
            this.editor.set(this.props.value);
        }
    }

    render() {
        const style = {
            backgroundColor: 'white',
            height: '100%',
        };

        return (
            <div id="jsoneditor" style={style} ref={(container) => this.editorContainer = container}>
            </div>
        );
    }
}

JSONEditor.propTypes = {
    dataChanged: PropTypes.func,
    jsonChangeMode: PropTypes.func,
};

const mapStateToProps = (state) => ({
    search: state.jsonEditor.jsonSearchValue,
    collapse: state.jsonEditor.collapse,
    expand: state.jsonEditor.expand,
    undo: state.jsonEditor.undo,
    redo: state.jsonEditor.redo,
    mode: state.jsonEditor.mode,
    compact: state.jsonEditor.compact,
    format: state.jsonEditor.format,
});

const mapDispatchToProps = (dispatch) => ({
    jsonChangeMode(mode) {
        dispatch(jsonEditorChangeMode(mode));
    },
    openErrorMessage(message) {
        dispatch(openErrorDialog({ message }));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JSONEditor);
