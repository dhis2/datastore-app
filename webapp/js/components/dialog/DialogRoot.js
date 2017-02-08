import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NewNamespaceDialog from './NewNamespaceDialog';
import NewKeyDialog from './NewKeyDialog';
import ConfirmDeleteNamespaceDialog from './ConfirmDeleteNamespaceDialog';
import ConfirmDeleteKeyDialog from './ConfirmDeleteKeyDialog';
import ErrorDialog from './ErrorDialog';

const DIALOG_COMPONENTS = {
    NEW_NAMESPACE: NewNamespaceDialog,
    NEW_KEY: NewKeyDialog,
    CONFIRM_DELETE_NAMESPACE: ConfirmDeleteNamespaceDialog,
    CONFIRM_DELETE_KEY: ConfirmDeleteKeyDialog,
    ERROR_DIALOG: ErrorDialog,
};

export class DialogRoot extends Component {

    render() {
        const { dialogType, dialogprops } = this.props;
        if (!dialogType) {
            return null;
        }
        const DialogType = DIALOG_COMPONENTS[dialogType];
        return (

            <div>
                <DialogType dialogprops={dialogprops} />
            </div>
        );
    }
}

DialogRoot.propTypes = {
    dialogType: PropTypes.string,
    dialogprops: PropTypes.shape({}),
};

const mapStateToProps = (state) => ({
    dialogType: state.dialog.type,
    dialogprops: state.dialog.props,
});

export default connect(
    mapStateToProps
)(DialogRoot);
