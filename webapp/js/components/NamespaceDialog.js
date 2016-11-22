import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { openDialog, closeDialog, createAndDisplayValue } from '../actions/actions'
class NamespaceDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            namespaceValue: "",
            keyValue: ""
        };

        this.newNamespaceDialog = this.newNamespaceDialog.bind(this);
        this.newKeyDialog = this.newKeyDialog.bind(this);
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
        const { dialogprops } = this.props.dialog;
        const namespace = dialogprops.namespace ? dialogprops.namespace : namespaceValue;
        if(namespace && keyValue) {
            this.props.createNamespace(namespace, keyValue)
        }
    }

    newNamespaceDialog(actions,fieldStyle,open) {

        return (<Dialog
                title="New Namespace"
                actions={actions}
                modal={false}
                open={open}
                contentStyle={{maxWidth:'500px'}}
                onRequestClose={this.handleClose.bind(this)}
            >
                <TextField hintText="Namespace" autoFocus style={fieldStyle}
                           onChange={this.handleNamespaceInput.bind(this)}/>
                <TextField hintText="Key value" style={fieldStyle} onChange={this.handleKeyInput.bind(this)}/>
            </Dialog>
        );
    }

    newKeyDialog(actions,fieldStyle, open) {
        return (<Dialog
            title="New key"
            actions={actions}
            modal={false}
            open={open}
            contentStyle={{maxWidth:'500px'}}
            onRequestClose={this.handleClose.bind(this)}
        >
            <TextField hintText="Key value" autoFocus style={fieldStyle} onChange={this.handleKeyInput.bind(this)}/>
        </Dialog>)
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
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
        const dialog = this.props.dialog;
        const open = dialog.dialogType ? true : false;
        const dialogComponent = dialog.dialogprops.namespace  ? this.newKeyDialog(actions,fieldStyle,open)
            : this.newNamespaceDialog(actions,fieldStyle,open)
        return (

            <div>
                {dialogComponent}
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
    dialog: state.ui.dialog
})

const mapDispatchToProps = (dispatch) => ({
    closeDialog() {
        dispatch(closeDialog())
    },
    createNamespace(namespace,key) {
        return dispatch(createAndDisplayValue(namespace,key))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NamespaceDialog);
