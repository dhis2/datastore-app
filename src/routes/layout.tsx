import { Card } from '@dhis2/ui'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import classes from '../App.module.css'
import Toolbar from '../components/create/Toolbar'
import EmptyArea from '../components/EmptyArea'
import Sidebar from '../components/sidebar/Sidebar'

function Layout() {
    const { store } = useParams()
    return (
        <div className={classes.container}>
            <div id="sidebar" className={classes.sidebar}>
                <Sidebar />
            </div>
            <div id="main" className={classes.main}>
                <Card>
                    {store && <Toolbar />}
                    <EmptyArea />
                    <Outlet />
                </Card>
            </div>
        </div>
    )
}

export default Layout
