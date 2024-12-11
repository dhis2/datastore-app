import React from 'react'
import { Outlet } from 'react-router-dom'
import classes from '../components/Panel.module.css'
import NamespacesPanel from '../components/panels/NamespacesPanel'

function ThreePanelLayout() {
    return (
        <div className={classes.container}>
            <div id="sidebar" className={classes.sidebar}>
                <NamespacesPanel />
            </div>
            <main id="main" className={classes.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default ThreePanelLayout
