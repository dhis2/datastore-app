import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DialogRoot from './DialogRoot';

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
    message: state.dialog.message,
});

export default connect(
    mapStateToProps
)(ErrorDialog);
