import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NewKeyDialog from './NewKeyDialog';
import NewNamespaceDialog from './NewNamespaceDialog';
import ConfirmDeleteNamespaceDialog from './ConfirmDeleteNamespaceDialog';
import ErrorDialog from './ErrorDialog';
import ConfirmDeleteKeyDialog from './ConfirmDeleteKeyDialog';

const DIALOG_COMPONENTS = {
    NEW_NAMESPACE: NewNamespaceDialog,
    NEW_KEY: NewKeyDialog,
    CONFIRM_DELETE_NAMESPACE: ConfirmDeleteNamespaceDialog,
    CONFIRM_DELETE_KEY: ConfirmDeleteKeyDialog,
    ERROR_DIALOG: ErrorDialog,
};

class DialogRouter extends Component {
    render() {
        if (!this.props.dialogType) {
            return null;
        }

        const DialogType = DIALOG_COMPONENTS[this.props.dialogType];

        return (
            <DialogType />
        );
    }
}

DialogRouter.propTypes = {
    dialogType: PropTypes.string,
};

const mapStateToProps = state => ({
    dialogType: state.dialog.type,
});

export default connect(
    mapStateToProps
)(DialogRouter);
