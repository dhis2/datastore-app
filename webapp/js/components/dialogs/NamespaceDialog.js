import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { setNamespaceDialogOpenState, createAndDisplayValue } from '../../actions/actions'
class NamespaceDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            namespaceValue: "",
            keyValue: ""
        }
    }

    handleNamespaceInput(event) {
        this.setState({
            namespaceValue: event.target.value
    });
    }

    handleKeyInput(event) {
        this.setState({
            keyValue: event.target.value
        });
    }

    handleClose() {
        console.log("close dialog");
        this.props.closeDialog()
    }

    handleCreate() {
        const {namespaceValue, keyValue } = this.state;
        console.log("creating with " + namespaceValue + " " + keyValue)
        if(namespaceValue && keyValue) {
            this.props.createNamespace(namespaceValue, keyValue)
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label="Create"
                primary={true}
                onTouchTap={this.handleCreate.bind(this)}
            />,
        ];
        const fieldStyle = {
            display: 'block',
            width:'100%'
        }

        return (

            <div>
                <Dialog
                    title="New Namespace"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    contentStyle={{maxWidth:'500px'}}
                    onRequestClose={this.handleClose.bind(this)}
                >
                    Create a new namespace. You must also provide the first value-key of the namespace.
                    <TextField hintText="Namespace" autoFocus style={fieldStyle} onChange={this.handleNamespaceInput.bind(this)} />
                    <TextField hintText="Value key" style={fieldStyle} onChange={this.handleKeyInput.bind(this)} />
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    value: state.ui.value,
    namespace: state.ui.namespace,
    selectedKey: state.ui.key,
    fetching: state.ui.fetching,
    updateError: state.ui.updateError,
    open: state.ui.openNamespaceDialog
})

const mapDispatchToProps = (dispatch) => ({
    closeDialog() {
        dispatch(setNamespaceDialogOpenState(false))
    },
    createNamespace(namespace,key) {
        return dispatch(createAndDisplayValue(namespace,key))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NamespaceDialog);
