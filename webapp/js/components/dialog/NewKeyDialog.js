import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DialogRoot from './DialogRoot';
import TextField from 'material-ui/TextField';
import { createAndDisplayValue } from 'actions/actions';
import { closeKeyDialog } from 'actions/dialogActions';

export class NamespaceDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyValue: '',
            keyError: '',
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleKeyInput(event) {
        const val = event.target.value;
        this.setState({
            keyError: this.validate(val),
            keyValue: event.target.value,
        });
    }

    handleCreate() {
        const { keyValue } = this.state;
        const { namespace } = this.props;
        if (namespace && keyValue) {
            this.props.createNamespace(namespace, keyValue);
        } else {
            this.setState({
                keyError: this.validate(keyValue),
            });
        }
    }

    validate(value) {
        return value ? '' : 'Invalid Input. Field required';
    }

    render() {
        const fieldStyle = {
            display: 'block',
            width: '100%',
        };

        return (<DialogRoot
            title="New key"
            approveAction={this.handleCreate}
            cancelAction={this.props.closeDialog}
            contentStyle={{ maxWidth: '500px' }}
        >
            <TextField hintText="Key value"
                autoFocus
                errorText={this.state.keyError}
                style={fieldStyle}
                onChange={this.handleKeyInput.bind(this)}
            />
        </DialogRoot>);
    }
}

NamespaceDialog.propTypes = {
    namespace: PropTypes.string.isRequired,
    closeDialog: PropTypes.func,
    createNamespace: PropTypes.func,
};

const mapStateToProps = state => ({
    namespace: state.dialog.namespace,
});

const mapDispatchToProps = dispatch => ({
    closeDialog() {
        dispatch(closeKeyDialog());
    },
    createNamespace(namespace, key) {
        dispatch(createAndDisplayValue(namespace, key));
        dispatch(closeKeyDialog());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NamespaceDialog);
