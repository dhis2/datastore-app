import { Card } from '@dhis2/ui'
import React from 'react'
import { Outlet } from 'react-router-dom'
import classes from '../App.module.css'
import EmptyArea from '../components/EmptyArea'
import Sidebar from '../components/sidebar/sidebar'

function Layout() {
    return (
        <div className={classes.container}>
            <div id="sidebar" className={classes.sidebar}>
                <Sidebar />
            </div>
            <div id="main" className={classes.main}>
                <Card>
                    <EmptyArea />
                    <Outlet />
                </Card>
            </div>
        </div>
    )
}

export default Layout
