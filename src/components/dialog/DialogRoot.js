import { PropTypes } from '@dhis2/prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeDialog } from '../../actions/dialogActions'

class DialogRoot extends Component {
    static buildButton(action, text, primary = false) {
        return <FlatButton label={text} primary={primary} onClick={action} />
    }

    render() {
        const {
            title,
            cancelAction,
            cancelLabel,
            approveAction,
            approveLabel,
            contentStyle,
            defaultCloseDialog,
        } = this.props

        const actions = []

        // TODO: Clean this up
        const finalAction = () => {
            Promise.resolve(approveAction())
                .then(() => defaultCloseDialog())
                .catch(() => {})
        }

        actions.push(
            DialogRoot.buildButton(
                cancelAction || defaultCloseDialog,
                cancelLabel || 'Cancel'
            )
        )
        if (approveAction) {
            actions.push(
                DialogRoot.buildButton(
                    finalAction,
                    approveLabel || 'Create',
                    true
                )
            )
        }

        return (
            <Dialog
                open
                title={title}
                actions={actions}
                modal={false}
                contentStyle={contentStyle || {}}
                onRequestClose={defaultCloseDialog}
            >
                {this.props.children}
            </Dialog>
        )
    }
}

DialogRoot.propTypes = {
    approveAction: PropTypes.func,
    approveLabel: PropTypes.string,
    cancelAction: PropTypes.func,
    cancelLabel: PropTypes.string,
    children: PropTypes.any,
    contentStyle: PropTypes.object,
    defaultCloseDialog: PropTypes.func,
    title: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => ({
    defaultCloseDialog() {
        dispatch(closeDialog())
    },
})

export default connect(null, mapDispatchToProps)(DialogRoot)
