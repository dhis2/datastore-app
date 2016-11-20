import React, { PropTypes, Component } from 'react'

import "bootstrap/dist/css/bootstrap.css";
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import '../../style/layout/layout.scss';
import AppContainer from '../containers/AppContainer'
class Layout extends Component {
    render() {
        const theme = AppContainer.theme.palette;
        const toolBarStyle = {
            backgroundColor: theme.primary1Color,
            color: theme.alternateTextColor,
            alignItems: 'center'
        }

        return (
            <div className={"wrapper"}>
                <div className={"layout-container"}>
                    <Toolbar style={toolBarStyle}>
                        <img src="../../img/logo_front.png" style={{height:'20px'}} alt="dhis2"/>
                        <ToolbarTitle text="dhis2 Datastore"/>
                    </Toolbar>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default Layout;
