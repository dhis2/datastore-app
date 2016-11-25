import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { deleteKey } from '../../actions/actions';
import { closeConfirmDeleteKeyDialog } from '../../actions/dialogActions';

class ConfirmDeleteKeyDialog extends Component {

    handleCancel() {
        this.props.closeDialog();
    }

    handleConfirmed() {
        const { namespace, key } = { ...this.props.dialogprops };
        this.props.deleteKeyInNamespace(namespace, key);
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
                Are you sure you want to delete '{this.props.dialogprops.key}' in {this.props.dialogprops.namespace}?
            </Dialog>)
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeDialog() {
        dispatch(closeConfirmDeleteKeyDialog());
    },
    deleteKeyInNamespace(namespace, key) {
        dispatch(deleteKey(namespace, key));
        dispatch(closeConfirmDeleteKeyDialog());
    },
});

ConfirmDeleteKeyDialog.propTypes = {
    dialogprops: PropTypes.shape({
        namespace: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
    }),
    closeDialog: PropTypes.func,
    deleteKeyInNamespace: PropTypes.func,
};

export default connect(
    null,
    mapDispatchToProps
)(ConfirmDeleteKeyDialog);
