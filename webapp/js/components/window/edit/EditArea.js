import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import JSONEditor from '../../utils/JSONEditor';
import AppContainer from '../../../containers/AppContainer';
import { updateValue, valueChange } from '../../../actions/actions';
import '../../../../style/valueWindow/valueWindow.scss';

class EditArea extends Component {

    dataFromJSONEditor(editor) {
        const { namespace, selectedKey } = this.props;
        try { // throws error if not valid json
            const data = editor.get();
            this.props.valueChange(namespace, selectedKey, data);
        } catch (err) { // do something with not valid json, dispatch rejectedValueChange
            console.log(err);
        }
    }

    render() {
        const { value } = this.props;
        return (
        <div className="window-area"
            style={{ backgroundColor: AppContainer.theme.palette.primary3Color }}
        >
          <JSONEditor value={value} dataChanged={this.dataFromJSONEditor.bind(this)} />
        </div>
        );
    }
}

EditArea.propTypes = {
    value: PropTypes.string,
    namespace: PropTypes.string,
    selectedKey: PropTypes.string,
    updateError: PropTypes.string,
    updateValue: PropTypes.func,
    valueChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
    value: state.ui.value,
    namespace: state.ui.namespace,
    selectedKey: state.ui.key,
    updateError: state.ui.updateError,
});

const mapDispatchToProps = (dispatch) => ({
    updateValue(namespace, key, value) {
        dispatch(updateValue(namespace, key, value));
    },
    valueChange(namespace, key, value) {
        dispatch(valueChange(namespace, key, value));
    },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArea);
