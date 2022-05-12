import { PropTypes } from '@dhis2/prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import DialogRoot from './DialogRoot'

export class ErrorDialog extends Component {
    render() {
        return (
            <DialogRoot
                cancelAction={this.props.closeDialog}
                contentStyle={{ maxWidth: '400px' }}
            >
                {this.props.message}
            </DialogRoot>
        )
    }
}

ErrorDialog.propTypes = {
    closeDialog: PropTypes.func,
    message: PropTypes.string,
}

const mapStateToProps = (state) => ({
    message: state.dialog.message,
})

export default connect(mapStateToProps)(ErrorDialog)
