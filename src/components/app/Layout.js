import { PropTypes } from '@dhis2/prop-types'
import React, { Component } from 'react'
import * as dialog from '../../constants/dialogTypes'
import ConfirmDeleteKeyDialog from '../dialog/ConfirmDeleteKeyDialog'
import ConfirmDeleteNamespaceDialog from '../dialog/ConfirmDeleteNamespaceDialog'
import DialogRoute from '../dialog/DialogRoute'
import DialogRouter from '../dialog/DialogRouter'
import ErrorDialog from '../dialog/ErrorDialog'
import NewKeyDialog from '../dialog/NewKeyDialog'
import NewNamespaceDialog from '../dialog/NewNamespaceDialog'
import Sidebar from '../sidebar/Sidebar'
import Snackbar from '../utils/Snackbar'
import styles from './Layout.module.css'

class Layout extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.layoutContainer}>
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
