import { PropTypes } from '@dhis2/prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteKey } from '../../actions'
import DialogRoot from './DialogRoot'

export class ConfirmDeleteKeyDialog extends Component {
    handleConfirmed = () => {
        const { namespace, keyValue } = this.props
        this.props.deleteKeyInNamespace(namespace, keyValue)
    }

    render() {
        const { namespace, keyValue, namespaceStore } = this.props
        let keysInNamespace = 0
        if (namespaceStore && namespaceStore[namespace]) {
            keysInNamespace = Object.keys(
                this.props.namespaceStore[namespace].keys
            ).length
        }

        const lastKeyMsg = (
            <p>This will also delete the namespace {namespace}.</p>
        )
        return (
            <DialogRoot
                approveAction={this.handleConfirmed}
                approveLabel={'Delete'}
                contentStyle={{ maxWidth: '400px' }}
            >
                <p>
                    Are you sure you want to delete {`'${keyValue}'`} in{' '}
                    {namespace}?
                </p>
                {keysInNamespace < 2 ? lastKeyMsg : ''}
            </DialogRoot>
        )
    }
}

ConfirmDeleteKeyDialog.propTypes = {
    keyValue: PropTypes.string.isRequired,
    namespace: PropTypes.string.isRequired,
    deleteKeyInNamespace: PropTypes.func,
    namespaceStore: PropTypes.any,
}

const mapStateToProps = (state) => ({
    namespace: state.dialog.namespace,
    keyValue: state.dialog.key,
    namespaceStore: state.sidebar.namespaces,
})

const mapDispatchToProps = (dispatch) => ({
    deleteKeyInNamespace(namespace, key) {
        dispatch(deleteKey(namespace, key))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDeleteKeyDialog)
