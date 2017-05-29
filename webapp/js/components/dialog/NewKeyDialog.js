import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import DialogRoot from './DialogRoot';
import TextField from 'material-ui/TextField';
import {createAndDisplayValue} from 'actions/actions'

export class NamespaceDialog extends Component {

    static validate(value) {
        return value ? '' : 'Invalid Input. Field required';
    }

    constructor(props) {
        super(props);

        this.state = {
            keyValue: '',
            keyError: '',
        };
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleKeyInput(event) {
        const val = event.target.value;
        this.setState({
            keyError: NamespaceDialog.validate(val),
            keyValue: val,
        });
    }

    handleCreate() {
        const {keyValue} = this.state;
        const {namespace} = this.props;

        return new Promise((resolve, reject) => {


            if (namespace && keyValue) {
                this.props.createNamespace(namespace, keyValue);
                resolve();
            } else {
                this.setState({
                    keyError: NamespaceDialog.validate(keyValue),
                });
                reject();
            }
        })
    }

    render() {
        const fieldStyle = {
            display: 'block',
            width: '100%',
        };

        return (<DialogRoot
            title="New key"
            approveAction={this.handleCreate}
            contentStyle={{maxWidth: '500px'}}
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
)(NamespaceDialog);
