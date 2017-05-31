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
        const { namespace, keyValue} = this.props;
        const keysInNamespace = Object.keys(this.props.namespaceStore[namespace].keys).length;
        const lastKeyMsg = (<p>This will also delete the namespace {namespace}</p>);
        return (
            <DialogRoot
                approveAction={this.handleConfirmed}
                approveLabel={'Delete'}
                contentStyle={{ maxWidth: '400px' }}
            >
                <p>Are you sure you want to delete '{keyValue}' in {namespace}?</p>
                {keysInNamespace < 2 ? lastKeyMsg : ''}
            </DialogRoot>
        );
    }
}

const mapStateToProps = state => ({
    namespace: state.dialog.namespace,
    keyValue: state.dialog.key,
    namespaceStore: state.sidebar.namespaces
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
