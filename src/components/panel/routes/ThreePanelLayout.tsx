import React from 'react'
import { Outlet } from 'react-router-dom'
import NamespacesSidePanel from '../NamespacesPanel'
import classes from '../Panel.module.css'

function ThreePanelLayout() {
    return (
        <div className={classes.container}>
            <div id="sidebar" className={classes.sidebar}>
                <NamespacesSidePanel />
            </div>
            <main id="main" className={classes.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default ThreePanelLayout
