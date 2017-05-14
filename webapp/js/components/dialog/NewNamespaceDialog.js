import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import DialogRoot from './DialogRoot';
import { createAndDisplayValue } from 'actions/actions';

export class NewNamespaceDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            namespaceValue: '',
            keyValue: '',
            namespaceError: '',
            keyError: '',
        };
        this.validate = this.validate.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleNamespaceInput(event) {
        const val = event.target.value;
        this.setState({
            namespaceError: this.validate(val),
            namespaceValue: event.target.value,
        });
    }

    handleKeyInput(event) {
        const val = event.target.value;
        this.setState({
            keyError: this.validate(val),
            keyValue: event.target.value,
        });
    }

    handleClose() {
        this.props.closeDialog();
    }

    handleCreate() {
        const { namespaceValue, keyValue } = this.state;
        if (namespaceValue && keyValue) {
            this.props.createNamespace(namespaceValue, keyValue);
        } else {
            this.setState({
                keyError: this.validate(keyValue),
                namespaceError: this.validate(namespaceValue),
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
        return (
            <DialogRoot
                title="New namespace"
                approveAction={this.handleCreate}
                cancelAction={this.props.closeDialog}
                contentStyle={{ maxWidth: '500px' }}
            >
                <TextField ref="namespace" hintText="Namespace" autoFocus style={fieldStyle}
                    errorText={this.state.namespaceError}
                    onChange={this.handleNamespaceInput.bind(this)}
                />
                <TextField ref="key" hintText="Key value" style={fieldStyle}
                    errorText={this.state.keyError}
                    onChange={this.handleKeyInput.bind(this)}
                />
            </DialogRoot>
        );
    }
}

NewNamespaceDialog.propTypes = {
    namespace: PropTypes.string,
    closeDialog: PropTypes.func,
    createNamespace: PropTypes.func,
};

const mapStateToProps = state => ({
    namespace: state.dialog.namespace,
});

const mapDispatchToProps = dispatch => ({
    createNamespace(namespace, key) {
        dispatch(createAndDisplayValue(namespace, key));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewNamespaceDialog);
