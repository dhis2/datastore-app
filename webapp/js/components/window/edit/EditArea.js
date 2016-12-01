import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import JSONEditor from '../../utils/JSONEditor';
import AppContainer from '../../../containers/AppContainer';
import { updateValue, valueChange } from '../../../actions/actions';
import '../../../../style/valueWindow/valueWindow.scss';
import WindowAreaHOC from '../../hoc/WindowAreaHOC';

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

        const backgroundStyle = {
            backgroundColor: AppContainer.theme.palette.primary3Color,
        };

        return (
        <div className={ 'fff-window-area' } style={ backgroundStyle }>
          <JSONEditor value={value} dataChanged={this.dataFromJSONEditor.bind(this)} />
        </div>
        );
    }
}

EditArea.propTypes = {
    namespace: PropTypes.string,
    selectedKey: PropTypes.string,
    updateValue: PropTypes.func,
    valueChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
    value: state.ui.value,
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
)(WindowAreaHOC(EditArea));
