import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

class DialogRouter extends Component {
    constructor(props) {
        super(props)

        this.matchDialog = this.matchDialog.bind(this)
    }

    matchDialog(dialogRoute) {
        return dialogRoute.props.name === this.props.dialogType
    }

    render() {
        const MatchingDialog = this.props.children.find(this.matchDialog)

        if (!MatchingDialog) return null

        const DialogType = MatchingDialog.props.component

        return <DialogType />
    }
}

DialogRouter.propTypes = {
    dialogType: PropTypes.string,
}

const mapStateToProps = state => ({
    dialogType: state.dialog.dialogType,
})

export default connect(mapStateToProps)(DialogRouter)
