import React, { PropTypes, Component } from 'react'

import '../../../style/valueWindow/valueWindow.scss';
import JSEditor from 'jsoneditor/dist/jsoneditor.min';
import '../../../style/vendor/jsoneditor.css';

class JSONEditor extends Component {

    constructor(props) {
        super(props);
        this.editor = null;
    }

    initEditor() {
        if(!this.editor && this.editorContainer) {
            const opts = {
                modes: ['tree','code']
            }
            this.editor = new JSEditor(this.editorContainer,opts);
            this.editor.set(this.props.value);
        }

    }

    componentDidMount() {
        this.initEditor();

    }

    componentWillReceiveProps() {
        console.log("receive");
        console.log(this.props.value);

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


