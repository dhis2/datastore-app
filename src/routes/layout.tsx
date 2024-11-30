import React from 'react'
import { Outlet } from 'react-router-dom'
import classes from '../App.module.css'
import Sidebar from '../components/sidebar/sidebar'

export default function Layout() {
    return (
        <div className={classes.container}>
            <div id="sidebar" className={classes.sidebar}>
                <Sidebar />
            </div>
            <div id="main" className={classes.main}>
                <Outlet />
            </div>
        </div>
    )
}
