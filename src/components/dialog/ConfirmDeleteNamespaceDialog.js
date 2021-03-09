import { PropTypes } from '@dhis2/prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteNamespace } from '../../actions'
import DialogRoot from './DialogRoot'

export class ConfirmDeleteNamespaceDialog extends Component {
    handleConfirmed = () => {
        this.props.deleteNamespace(this.props.namespace)
    }

    render() {
        return (
            <DialogRoot
                approveAction={this.handleConfirmed}
                approveLabel={'Delete'}
                contentStyle={{ maxWidth: '400px' }}
            >
                <p>
                    Are you sure you want to delete{' '}
                    {`'${this.props.namespace}'`}?
                </p>
                <p>
                    This will delete <u>all</u> keys in this namespace.
                </p>
            </DialogRoot>
        )
    }
}

ConfirmDeleteNamespaceDialog.propTypes = {
    namespace: PropTypes.string.isRequired,
    deleteNamespace: PropTypes.func,
}

const mapStateToProps = state => ({
    namespace: state.dialog.namespace,
})

const mapDispatchToProps = dispatch => ({
    deleteNamespace(namespace) {
        dispatch(deleteNamespace(namespace))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDeleteNamespaceDialog)
