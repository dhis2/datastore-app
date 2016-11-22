import React, { PropTypes, Component } from 'react'

import "bootstrap/dist/css/bootstrap.css";
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import '../../style/layout/layout.scss';
import AppContainer from '../containers/AppContainer'
import  { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

class Layout extends Component {
    render() {
        const theme = AppContainer.theme.palette;
        const toolBarStyle = {
            backgroundColor: theme.primary1Color,
            color: theme.alternateTextColor,
            alignItems: 'center'
        };

        const snackbarMessage = this.props.snackbarMessage;
        const showSnackbar = typeof snackbarMessage === 'string';

        return (
            <div className={"wrapper"}>
                <div className={"layout-container"}>
                    <Toolbar style={toolBarStyle}>
                        <img src="../../img/logo_front.png" style={{height:'20px'}} alt="dhis2"/>
                        <ToolbarTitle text="dhis2 Datastore"/>
                    </Toolbar>
                    { this.props.children }
                </div>
                <Snackbar open={showSnackbar} message={snackbarMessage || ''} autoHideDuration={5000} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        snackbarMessage: state.api.snackbarMessage
    }
};

export default connect(
    mapStateToProps,
    null
)(Layout);
