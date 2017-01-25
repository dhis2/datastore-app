import React, { PropTypes, Component } from 'react';

import NavigationBar from './NavigationBar';
import Snackbar from 'components/utils/Snackbar';
import Sidebar from 'components/sidebar/Sidebar';
import DialogRoot from 'components/dialog/DialogRoot';
import '../../style/layout/layout.scss';
import '../../style/pages/pages.scss';

class Layout extends Component {
    render() {
        return (
            <div className={ 'fff-wrapper' }>
                <div className={ 'fff-layout-container' }>
                    <NavigationBar />
                    <div className={ 'fff-page-container' }>
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
