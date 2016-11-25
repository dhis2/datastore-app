import React, { PropTypes, Component } from 'react';

import '../../../style/valueWindow/valueWindow.scss';
import JSEditor from 'jsoneditor/dist/jsoneditor.min';
import '../../../style/vendor/jsoneditor.css';

class JSONEditor extends Component {

    constructor(props) {
        super(props);
        this.editor = null;
    }

    componentDidMount() {
        this.initEditor();
    }

    /* Need custom update condition as we only re-render when the value changes.*/
    shouldComponentUpdate(nextProps) {
        if (this.props.value === nextProps.value) {
            return false;
        }
        return true;
    }

    componentWillUpdate(nextProps) {
        this.editor.set(nextProps.value);
    }

    changedEvent() {
        this.props.dataChanged(this.editor);
    }

    initEditor() {
        if (!this.editor && this.editorContainer) {
            const opts = {
                modes: ['tree', 'code'],
                onChange: this.changedEvent.bind(this),
            };
            this.editor = new JSEditor(this.editorContainer, opts);
            this.editor.set(this.props.value);
        }
    }

    render() {
        return (
            <div id="jsoneditor" ref={(container) => this.editorContainer = container}>
            </div>
        );
    }
}

JSONEditor.propTypes = {
    value: PropTypes.object,
    dataChanged: PropTypes.func,
};

export default JSONEditor;
