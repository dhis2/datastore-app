import React, { PropTypes, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../../style/layout/layout.scss';
import AppContainer from '../containers/AppContainer';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

class Layout extends Component {
    render() {
        const message = this.props.snackbarMessage;

        let snackbarMessage = null;
        if (message) {
            if (message.message) {
                snackbarMessage = message.message;
            }
        }
        const showSnackbar = typeof snackbarMessage === 'string';
        return (
            <div className={'wrapper'}>
                <div className={'layout-container'}>
                    <NavigationBar theme={AppContainer.theme.palette} />
                    { this.props.children }
                </div>
                <Snackbar open={showSnackbar} message={<span>{snackbarMessage}</span>} autoHideDuration={5000} />
            </div>
        );
    }
}

Layout.propTypes = {
    snackbarMessage: PropTypes.string,
    children: PropTypes.object,
};

const mapStateToProps = (state) => ({
    snackbarMessage: state.api.snackbarMessage,
});

export default connect(
    mapStateToProps,
    null
)(Layout);
