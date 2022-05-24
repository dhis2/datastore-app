import { PropTypes } from '@dhis2/prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class DialogRouter extends Component {
    matchDialog = (dialogRoute) =>
        dialogRoute.props.name === this.props.dialogType

    render() {
        const MatchingDialog = this.props.children.find(this.matchDialog)

        if (!MatchingDialog) {
            return null
        }

        const DialogType = MatchingDialog.props.component
        return <DialogType />
    }
}

DialogRouter.propTypes = {
    children: PropTypes.any,
    dialogType: PropTypes.string,
}

const mapStateToProps = (state) => ({
    dialogType: state.dialog.dialogType,
})

export default connect(mapStateToProps)(DialogRouter)
