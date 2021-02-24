import * as dialog from 'constants/dialogTypes'
import { PropTypes } from '@dhis2/prop-types'
import ConfirmDeleteNamespaceDialog from 'components/dialog//ConfirmDeleteNamespaceDialog'
import NewKeyDialog from 'components/dialog//NewKeyDialog'
import NewNamespaceDialog from 'components/dialog//NewNamespaceDialog'
import ConfirmDeleteKeyDialog from 'components/dialog/ConfirmDeleteKeyDialog'
import DialogRoute from 'components/dialog/DialogRoute'
import DialogRouter from 'components/dialog/DialogRouter'
import ErrorDialog from 'components/dialog/ErrorDialog'
import Sidebar from 'components/sidebar/Sidebar'
import Snackbar from 'components/utils/Snackbar'
import React, { Component } from 'react'
import styles from './Layout.module.css'
import NavigationBar from './NavigationBar'

class Layout extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.layoutContainer}>
                    <NavigationBar />
                    <div className={styles.pageContainer}>
                        <Sidebar />
                        {this.props.children}
                        <DialogRouter>
                            <DialogRoute
                                name={dialog.NEW_KEY}
                                component={NewKeyDialog}
                            />
                            <DialogRoute
                                name={dialog.NEW_NAMESPACE}
                                component={NewNamespaceDialog}
                            />
                            <DialogRoute
                                name={dialog.ERROR_DIALOG}
                                component={ErrorDialog}
                            />
                            <DialogRoute
                                name={dialog.CONFIRM_DELETE_KEY}
                                component={ConfirmDeleteKeyDialog}
                            />
                            <DialogRoute
                                name={dialog.CONFIRM_DELETE_NAMESPACE}
                                component={ConfirmDeleteNamespaceDialog}
                            />
                        </DialogRouter>
                    </div>
                </div>
                <Snackbar />
            </div>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.object,
}

export default Layout
