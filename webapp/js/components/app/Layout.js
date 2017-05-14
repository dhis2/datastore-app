import React, { PropTypes, Component } from 'react';
import NavigationBar from './NavigationBar';
import Snackbar from 'components/utils/Snackbar';
import Sidebar from 'components/sidebar/Sidebar';
import * as dialog from 'constants/dialogTypes';

import DialogRouter from 'components/dialog/DialogRouter';
import DialogRoute from 'components/dialog/DialogRoute';

import NewKeyDialog from 'components/dialog//NewKeyDialog';
import NewNamespaceDialog from 'components/dialog//NewNamespaceDialog';
import ConfirmDeleteNamespaceDialog from 'components/dialog//ConfirmDeleteNamespaceDialog';
import ErrorDialog from 'components/dialog/ErrorDialog';
import ConfirmDeleteKeyDialog from 'components/dialog/ConfirmDeleteKeyDialog';

import '../../../style/layout/layout.scss';
import '../../../style/pages/pages.scss';

class Layout extends Component {
    render() {
        return (
            <div className={'fff-wrapper'}>
                <div className={'fff-layout-container'}>
                    <NavigationBar />
                    <div className={'fff-page-container'}>
                        <Sidebar />
                        {this.props.children}
                        <DialogRouter>
                            <DialogRoute name={dialog.NEW_KEY} component={NewKeyDialog} />
                            <DialogRoute name={dialog.NEW_NAMESPACE} component={NewNamespaceDialog} />
                            <DialogRoute name={dialog.ERROR_DIALOG} component={ErrorDialog} />
                            <DialogRoute name={dialog.CONFIRM_DELETE_KEY} component={ConfirmDeleteKeyDialog} />
                            <DialogRoute name={dialog.CONFIRM_DELETE_NAMESPACE}
                                component={ConfirmDeleteNamespaceDialog}
                            />
                        </DialogRouter>
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
