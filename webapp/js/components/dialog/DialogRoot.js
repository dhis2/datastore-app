import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NewNamespaceDialog from './NewNamespaceDialog';
import NewKeyDialog from './NewKeyDialog';
import ConfirmDeleteNamespaceDialog from './ConfirmDeleteNamespaceDialog';
import ConfirmDeleteKeyDialog from './ConfirmDeleteKeyDialog';
const DIALOG_COMPONENTS = {
    NEW_NAMESPACE: NewNamespaceDialog,
    NEW_KEY: NewKeyDialog,
    CONFIRM_DELETE_NAMESPACE: ConfirmDeleteNamespaceDialog,
    CONFIRM_DELETE_KEY: ConfirmDeleteKeyDialog,
};

class DialogRoot extends Component {

    render() {
        const { dialogType, dialogprops } = this.props.dialog;
        if (!dialogType) {
            return null;
        }
        const DialogType = DIALOG_COMPONENTS[dialogType];
        return (

            <div>
                <DialogType dialogprops = {dialogprops} />
            </div>
        );
    }
}

DialogRoot.propTypes = {
    dialog: PropTypes.shape({
        dialogType: PropTypes.string,
        dialogprops: PropTypes.shape,
    }),
};

const mapStateToProps = (state) => ({
    dialog: state.ui.dialog,
});

export default connect(
    mapStateToProps
)(DialogRoot);
