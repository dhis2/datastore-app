import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import { closeConfirmDeleteDialog } from '../../actions/dialogActions'
import { deleteNamespace } from '../../actions/actions'
class ConfirmDeleteDialog extends Component {
    constructor(props) {
        super(props);

    }

    handleCancel() {
        this.props.closeDialog();
    }

    handleConfirmed() {
        this.props.deleteNamespace(this.props.dialogprops.namespace)
    }

    render() {
        const actions = [<FlatButton
            label="Cancel"
            primary={false}
            onTouchTap={this.handleCancel.bind(this)}
        />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.handleConfirmed.bind(this)}
            />,
    ];
        return (
            (<Dialog
                actions={actions}
                modal={false}
                open={true}
                contentStyle={{maxWidth:'400px'}}
                onRequestClose={this.handleCancel.bind(this)}
            >
                Are you sure you want to delete '{this.props.dialogprops.namespace}'?
            </Dialog>)
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    closeDialog() {
        dispatch(closeConfirmDeleteDialog())
    },
    deleteNamespace(namespace) {
        dispatch(deleteNamespace(namespace))
        dispatch(closeConfirmDeleteDialog())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDeleteDialog);
