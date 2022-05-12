import { PropTypes } from '@dhis2/prop-types'
import SnackbarUI from 'material-ui/Snackbar'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { emptySnackbar } from '../../actions'

export class Snackbar extends Component {
    render() {
        return (
            <SnackbarUI
                open={typeof this.props.message === 'string'}
                message={<span>{this.props.message}</span>}
                autoHideDuration={5000}
                onRequestClose={this.props.emptySnackbar}
            />
        )
    }
}

Snackbar.propTypes = {
    emptySnackbar: PropTypes.func,
    message: PropTypes.string,
}

const mapStateToProps = (state) => ({
    message: state.snackbar.message,
})

const mapDispatchToProps = (dispatch) => ({
    emptySnackbar() {
        dispatch(emptySnackbar())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar)
