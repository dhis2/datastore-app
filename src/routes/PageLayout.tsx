import React, { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import classes from '../App.module.css'

function PageLayout() {
    const { store } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const storeOptions = ['dataStore', 'userDataStore']
        if (!storeOptions.includes(store)) {
            console.log("pGE LOAYOUT IN CONDITIONAL", store)
            navigate('dataStore')
        }
    }, [store])

    return (
        <div className={classes.page}>
            <Outlet />
        </div>
    )
}

export default PageLayout
