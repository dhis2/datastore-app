import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DialogRoot from './DialogRoot';
import { deleteKey } from 'actions/actions';
import { closeConfirmDeleteKeyDialog } from 'actions/dialogActions';

export class ConfirmDeleteKeyDialog extends Component {

    constructor(props) {
        super(props);
        this.handleConfirmed = this.handleConfirmed.bind(this);
    }

    handleConfirmed() {
        const { namespace, key } = { ...this.props };
        this.props.deleteKeyInNamespace(namespace, key);
    }

    render() {
        return (
            <DialogRoot
                approveAction={this.props.closeDialog}
                cancelAction={this.handleConfirmed}
                approveLabel={'Delete'}
                contentStyle={{ maxWidth: '400px' }}
            >
                Are you sure you want to delete '{this.props.key}' in {this.props.namespace}?
            </DialogRoot>
        );
    }
}

const mapStateToProps = state => ({
    namespace: state.dialog.namespace,
    key: state.dialog.key,
});

const mapDispatchToProps = dispatch => ({
    closeDialog() {
        dispatch(closeConfirmDeleteKeyDialog());
    },
    deleteKeyInNamespace(namespace, key) {
        dispatch(deleteKey(namespace, key));
        dispatch(closeConfirmDeleteKeyDialog());
    },
});

ConfirmDeleteKeyDialog.propTypes = {
    namespace: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    closeDialog: PropTypes.func,
    deleteKeyInNamespace: PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDeleteKeyDialog);
