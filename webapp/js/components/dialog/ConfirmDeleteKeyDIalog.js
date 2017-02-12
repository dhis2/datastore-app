import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DialogRoot from './DialogRoot';
import { deleteKey } from 'actions/actions';

export class ConfirmDeleteKeyDialog extends Component {

    constructor(props) {
        super(props);
        this.handleConfirmed = this.handleConfirmed.bind(this);
    }

    handleConfirmed() {
        const { namespace, keyValue } = { ...this.props };
        this.props.deleteKeyInNamespace(namespace, keyValue);
    }

    render() {
        return (
            <DialogRoot
                approveAction={this.handleConfirmed}
                approveLabel={'Delete'}
                contentStyle={{ maxWidth: '400px' }}
            >
                Are you sure you want to delete '{this.props.keyValue}' in {this.props.namespace}?
            </DialogRoot>
        );
    }
}

const mapStateToProps = state => ({
    namespace: state.dialog.namespace,
    keyValue: state.dialog.key,
});

const mapDispatchToProps = dispatch => ({
    deleteKeyInNamespace(namespace, key) {
        dispatch(deleteKey(namespace, key));
    },
});

ConfirmDeleteKeyDialog.propTypes = {
    namespace: PropTypes.string.isRequired,
    keyValue: PropTypes.string.isRequired,
    closeDialog: PropTypes.func,
    deleteKeyInNamespace: PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDeleteKeyDialog);
