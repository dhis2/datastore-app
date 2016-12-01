import React, { PropTypes, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../../style/layout/layout.scss';
import '../../style/pages/pages.scss';
import AppContainer from '../containers/AppContainer';
import NavigationBar from './NavigationBar';
import Snackbar from '../components/utils/Snackbar';
import Sidebar from '../components/sidebar/Sidebar';
import DialogRoot from '../components/dialog/DialogRoot';

class Layout extends Component {
    render() {
        return (
            <div className={'fff-wrapper'}>
                <div className={'fff-layout-container'}>
                    <NavigationBar theme={AppContainer.theme.palette} />
                    <div className="fff-page-container">
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
