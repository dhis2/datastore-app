import React from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import classes from '../App.module.css'
import { DATASTORE_OPTIONS } from '../constants/constants'

function PageLayout() {
    const { store } = useParams()

    if (!DATASTORE_OPTIONS.includes(store)) {
        return <Navigate to={'dataStore'} replace />
    }

    return (
        <div className={classes.page}>
            <Outlet />
        </div>
    )
}

export default PageLayout
