import React, { PropTypes, Component } from 'react';

import { connect } from 'react-redux';
import SnackbarUI from 'material-ui/Snackbar';

class Snackbar extends Component {
    render() {
        const message = this.props.snackbarMessage;

        let snackbarMessage = null;
        if (message && message.message) {
            snackbarMessage = message.message;
        }
        const showSnackbar = typeof snackbarMessage === 'string';
        return (
            <SnackbarUI open={showSnackbar} message={<span>{snackbarMessage}</span>}
                autoHideDuration={5000}
        />
        );
    }
}

Snackbar.propTypes = {
    snackbarMessage: PropTypes.object,
};

const mapStateToProps = (state) => ({
    snackbarMessage: state.ui.snackbarMessage,
});

export default connect(
    mapStateToProps,
    null
)(Snackbar);
