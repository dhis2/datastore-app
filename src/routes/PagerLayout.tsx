import React, { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import classes from '../Page.module.css'

function PagerLayout() {
    const { store } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const storeOptions = ['dataStore', 'userDataStore']
        if (!storeOptions.includes(store)) {
            navigate('/dataStore')
        }
    }, [store])

    return (
        <div className={classes.page}>
            <main className={classes.container}>
                <Outlet />
            </main>
        </div>
    )
}

export default PagerLayout
