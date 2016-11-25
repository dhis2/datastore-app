import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { closeConfirmDeleteNamespaceDialog } from '../../actions/dialogActions';
import { deleteNamespace } from '../../actions/actions';
class ConfirmDeleteNamespaceDialog extends Component {

    handleCancel() {
        this.props.closeDialog();
    }

    handleConfirmed() {
        this.props.deleteNamespace(this.props.dialogprops.namespace);
    }

    render() {
        const actions = [<FlatButton
            label="Cancel"
            primary={false}
            onTouchTap={this.handleCancel.bind(this)}
        />,
            <FlatButton
                label="Delete"
                primary
                onTouchTap={this.handleConfirmed.bind(this)}
            />,
        ];
        return (
            (<Dialog
                actions={actions}
                modal={false}
                open
                contentStyle={{ maxWidth: '400px' }}
                onRequestClose={this.handleCancel.bind(this)}
            >
                Are you sure you want to delete '{this.props.dialogprops.namespace}'?
            </Dialog>)
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeDialog() {
        dispatch(closeConfirmDeleteNamespaceDialog());
    },
    deleteNamespace(namespace) {
        dispatch(deleteNamespace(namespace));
        dispatch(closeConfirmDeleteNamespaceDialog());
    },
});

ConfirmDeleteNamespaceDialog.propTypes = {
    closeDialog: PropTypes.func,
    dialogprops: PropTypes.shape({
        namespace: PropTypes.string.isRequired,
    }),
    deleteNamespace: PropTypes.func,
};

export default connect(
    null,
    mapDispatchToProps
)(ConfirmDeleteNamespaceDialog);
