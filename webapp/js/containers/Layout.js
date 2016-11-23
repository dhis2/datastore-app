import React, { PropTypes, Component } from 'react'

import "bootstrap/dist/css/bootstrap.css"
import '../../style/layout/layout.scss';
import NavigationBar from './NavigationBar';
import AppContainer from '../containers/AppContainer'
class Layout extends Component {
    render() {

        return (
            <div className={"wrapper"}>
                <div className={"layout-container"}>
                    <NavigationBar theme={AppContainer.theme.palette}/>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default Layout;
