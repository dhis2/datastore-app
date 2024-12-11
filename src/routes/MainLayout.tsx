import React from 'react'
import { Outlet } from 'react-router-dom'
import classes from '../components/Panel.module.css'
import KeysPanel from '../components/panels/KeysPanel'

export default function MainLayout() {
    return (
        <>
            <div className={classes.sidebar}>
                <KeysPanel />
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}
