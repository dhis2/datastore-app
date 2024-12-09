import React from 'react'
import { Outlet } from 'react-router-dom'
import classes from '../Page.module.css'

function PagerLayout() {
    return (
        <div className={classes.page}>
            <main className={classes.container}>
                <Outlet />
            </main>
        </div>
    )
}

export default PagerLayout
