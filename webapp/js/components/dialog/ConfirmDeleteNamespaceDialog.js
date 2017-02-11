import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DialogRoot from './DialogRoot';
import { closeConfirmDeleteNamespaceDialog } from 'actions/dialogActions';
import { deleteNamespace } from 'actions/actions';

export class ConfirmDeleteNamespaceDialog extends Component {

    constructor(props) {
        super(props);
        this.handleConfirmed = this.handleConfirmed.bind(this);
    }

    handleConfirmed() {
        this.props.deleteNamespace(this.props.namespace);
    }

    render() {
        return (
            (<DialogRoot
                approveAction={this.handleConfirmed}
                approveLabel={'Delete'}
                cancelAction={this.props.closeDialog}
                contentStyle={{ maxWidth: '400px' }}
            >
                Are you sure you want to delete '{this.props.namespace}'?
            </DialogRoot>)
        );
    }
}

ConfirmDeleteNamespaceDialog.propTypes = {
    namespace: PropTypes.string.isRequired,
    closeDialog: PropTypes.func,
    deleteNamespace: PropTypes.func,
};

const mapStateToProps = state => ({
    namespace: state.dialog.namespace,
});

const mapDispatchToProps = dispatch => ({
    closeDialog() {
        dispatch(closeConfirmDeleteNamespaceDialog());
    },
    deleteNamespace(namespace) {
        dispatch(deleteNamespace(namespace));
        dispatch(closeConfirmDeleteNamespaceDialog());
    },
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDeleteNamespaceDialog);
