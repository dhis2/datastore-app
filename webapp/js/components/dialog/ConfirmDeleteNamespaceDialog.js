import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DialogRoot from './DialogRoot';
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
                contentStyle={{ maxWidth: '400px' }}
            >
                <p>Are you sure you want to delete '{this.props.namespace}'?</p>
                <p>This will delete <u>all</u> keys in the namespace</p>
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
    deleteNamespace(namespace) {
        dispatch(deleteNamespace(namespace));
    },
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDeleteNamespaceDialog);
