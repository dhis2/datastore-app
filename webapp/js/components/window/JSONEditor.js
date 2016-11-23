import React, { PropTypes, Component } from 'react'

import '../../../style/valueWindow/valueWindow.scss';
import JSEditor from 'jsoneditor/dist/jsoneditor.min';
import '../../../style/vendor/jsoneditor.css';

class JSONEditor extends Component {

    constructor(props) {
        super(props);
        this.editor = null;
    }

    changedEvent() {
        this.props.dataChanged(this.editor);
    }

    initEditor() {
        if(!this.editor && this.editorContainer) {
            const opts = {
                modes: ['tree','code'],
                onChange: this.changedEvent.bind(this)
            }
            this.editor = new JSEditor(this.editorContainer,opts);
            this.editor.set(this.props.value);
        }
    }

    /* Need custom update condition as we only re-render when the value changes.*/
    shouldComponentUpdate(nextProps,nextState) {
        if(this.props.value === nextProps.value) {
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.initEditor();

    }

    componentWillUpdate(nextProps,nextState) {
        this.editor.set(nextProps.value);
    }

    render () {
        const { value } = this.props;

        return (
            <div id="jsoneditor" ref={(container) => this.editorContainer = container}>
            </div>
        )
    }
}

export default JSONEditor;
