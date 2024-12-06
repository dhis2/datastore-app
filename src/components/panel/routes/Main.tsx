import React from 'react'
import { Outlet } from 'react-router-dom'
import KeysSidePanel from '../KeysPanel'
import classes from '../Panel.module.css'

export default function Main() {
    return (
        <>
            <div className={classes.sidebar}>
                <KeysSidePanel />
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}
