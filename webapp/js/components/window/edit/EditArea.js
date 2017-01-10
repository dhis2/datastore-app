import React, { PropTypes, Component } from 'react';
import JSONEditor from '../../utils/JSONEditor';
import Theme from '../../../utils/theme';
import '../../../../style/window/window.scss';
import WindowAreaHOC from '../../hoc/WindowAreaHOC';

export class EditArea extends Component {

    dataFromJSONEditor(editor) {
        try { // throws error if not valid json
            const data = editor.get();
            this.props.valueChange(data);
        } catch (err) {
            this.props.valueChange(err, true);
        }
    }

    render() {
        const { value } = this.props;

        const backgroundStyle = {
            backgroundColor: Theme.palette.primary3Color,
        };
        return (
            <div className={ 'fff-window-area' } style={ backgroundStyle }>
                <JSONEditor value={value} dataChanged={this.dataFromJSONEditor.bind(this)}/>
            </div>
        );
    }
}

EditArea.propTypes = {
    valueChange: PropTypes.func,
};


export default WindowAreaHOC(EditArea);
