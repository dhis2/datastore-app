import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DialogRoot from './DialogRoot';
import { closeErrorDialog } from 'actions/dialogActions';

export class ErrorDialog extends Component {
    render() {
        return (
            (<DialogRoot
                cancelAction={this.props.closeDialog}
                contentStyle={{ maxWidth: '400px' }}
            >
                {this.props.message}
            </DialogRoot>)
        );
    }
}

ErrorDialog.propTypes = {
    message: PropTypes.string,
    closeDialog: PropTypes.func,
};

const mapStateToProps = state => ({
    message: state.dialog.props.message,
});

const mapDispatchToProps = dispatch => ({
    closeDialog() {
        dispatch(closeErrorDialog());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorDialog);
