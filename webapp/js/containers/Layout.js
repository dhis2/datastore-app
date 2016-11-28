import React, { PropTypes, Component } from 'react';

import HomePage from './pages/HomePage';

import 'bootstrap/dist/css/bootstrap.css';
import '../../style/layout/layout.scss';
import AppContainer from '../containers/AppContainer';
import NavigationBar from './NavigationBar';
import Snackbar from '../components/utils/Snackbar';
import Sidebar from '../components/sidebar/Sidebar';
import DialogRoot from '../components/dialog/DialogRoot';

class Layout extends Component {
    render() {
        return (
            <div className={'wrapper'}>
                <div className={'layout-container'}>
                    <NavigationBar theme={AppContainer.theme.palette}/>
                    <div className="home-page-container">
                        <Sidebar />
                        { this.props.children }
                        <DialogRoot />
                    </div>
                </div>
                <Snackbar />
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.object,
};

export default Layout;