import { Card } from '@dhis2/ui'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import classes from '../App.module.css'
import Toolbar from '../components/create/Toolbar'
import Sidebar from '../components/sidebar/Sidebar'

function Layout() {
    const { store } = useParams()
    return (
        <div className={classes.container}>
            <nav id="sidebar" className={classes.sidebar}>
                <Sidebar />
            </nav>
            <main id="main" className={classes.main}>
                <Card>
                    {store && <Toolbar />}
                    <Outlet />
                </Card>
            </main>
        </div>
    )
}

export default Layout
