import { PropTypes } from '@dhis2/prop-types'
import { closeDialog } from 'actions/dialogActions'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class DialogRoot extends Component {
    static buildButton(action, text, primary = false) {
        return <FlatButton label={text} primary={primary} onTouchTap={action} />
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
        if (approveAction)
            actions.push(
                DialogRoot.buildButton(
                    finalAction,
                    approveLabel || 'Create',
                    true
                )
            )

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
    title: PropTypes.string,
    cancelLabel: PropTypes.string,
    approveLabel: PropTypes.string,
    cancelAction: PropTypes.func,
    approveAction: PropTypes.func,
    defaultCloseDialog: PropTypes.func,
    contentStyle: PropTypes.object,
}

const mapDispatchToProps = dispatch => ({
    defaultCloseDialog() {
        dispatch(closeDialog())
    },
})

export default connect(null, mapDispatchToProps)(DialogRoot)
