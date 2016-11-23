import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { createAndDisplayValue } from '../../actions/actions'
import { closeKeyDialog } from '../../actions/dialogActions';
class NamespaceDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keyValue: "",
            keyError: ""
        };
        this.validate = this.validate.bind(this)
    }

    handleKeyInput(event) {
        const val = event.target.value;
        this.setState({
            keyError: this.validate(val),
            keyValue: event.target.value
        });
    }

    handleClose() {
        console.log("close dialog");
        this.props.closeDialog()
    }

    handleCreate() {
        const { keyValue } = this.state;
        const { namespace } = this.props.dialogprops;
        if(namespace && keyValue) {
            this.props.createNamespace(namespace, keyValue)
        } else {
            this.setState({
                keyError: this.validate(keyValue)
            })
        }
    }

    validate(value) {
        return value ? "" : "Invalid Input. Field required";
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

        return (<Dialog
            title="New key"
            actions={actions}
            modal={false}
            open={true}
            contentStyle={{maxWidth:'500px'}}
            onRequestClose={this.handleClose.bind(this)}
        >
            <TextField hintText="Key value" autoFocus errorText={this.state.keyError} style={fieldStyle} onChange={this.handleKeyInput.bind(this)}/>
        </Dialog>)
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    closeDialog() {
        dispatch(closeKeyDialog())
    },
    createNamespace(namespace,key) {
        dispatch(createAndDisplayValue(namespace,key))
        dispatch(closeKeyDialog())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NamespaceDialog);


