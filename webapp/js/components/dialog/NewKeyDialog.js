import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import DialogRoot from './DialogRoot';
import TextField from 'material-ui/TextField';
import {createAndDisplayValue} from 'actions/actions'
import { validateKeyOrNamespace } from '../../utils/validation';

export class NamespaceDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyValue: '',
            keyError: '',
        };
        this.handleCreate = this.handleCreate.bind(this);
    }


    /*Workaround for focusing the textfield, as the dropdown-menu when selecting "New Key" keeps the focus,
    preventing material-UIs autoFocus to focus it */
    componentDidMount() {
        setTimeout(() => {
            this.refs.key.focus();
        }, 1);

    }

    handleKeyInput(event) {
        const val = event.target.value;
        this.setState({
            keyError: validateKeyOrNamespace(val).message,
            keyValue: val,
        });
    }

    handleCreate() {
        const {keyValue} = this.state;
        const {namespace} = this.props;

        return new Promise((resolve, reject) => {
            const validatedKey = validateKeyOrNamespace(keyValue);

            if (namespace && validatedKey.valid) {
                this.props.createNamespace(namespace, keyValue);
                resolve();
            } else {
                this.setState({
                    keyError: validatedKey.message,
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
            title={"New key for " + this.props.namespace}
            approveAction={this.handleCreate}
            contentStyle={{maxWidth: '500px'}}
        >
            <TextField hintText="Key name"
                       autoFocus
                       ref="key"
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
