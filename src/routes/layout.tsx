import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import classes from '../App.module.css'
import Sidebar from '../components/sidebar/Sidebar'

function Layout() {
    const { store, namespace } = useParams()
    return (
        <div className={classes.container}>
            <div id="sidebar" className={classes.sidebar}>
                <Sidebar />
            </div>
            <div id="main" className={classes.main}>
                {/* Empty Display component */}
                {!store && <p>Select a datastore to show namespaces</p>}
                {store && !namespace && <p>Click a namespace to show keys</p>}
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
