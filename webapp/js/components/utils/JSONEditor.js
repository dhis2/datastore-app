import React, { PropTypes, Component } from 'react';
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
        return this.props.value !== nextProps.value;
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
};

export default JSONEditor;
