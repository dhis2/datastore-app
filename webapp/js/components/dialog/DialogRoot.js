import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import NewNamespaceDialog from './NewNamespaceDialog';
import NewKeyDialog from './NewKeyDialog';
const DIALOG_COMPONENTS = {
    'NEW_NAMESPACE': NewNamespaceDialog,
    'NEW_KEY': NewKeyDialog,
    'CONFIRM_DELETE': {}
}

class NamespaceDialog extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { dialogType, dialogprops } = this.props.dialog;
        if(!dialogType) {
            return null;
        }
        const DialogType = DIALOG_COMPONENTS[dialogType]
        return (

            <div>
                <DialogType dialogprops = {dialogprops} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    dialog: state.ui.dialog
})


export default connect(
    mapStateToProps
)(NamespaceDialog);
