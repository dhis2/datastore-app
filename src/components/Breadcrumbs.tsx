import React from 'react'
import { Link, useLocation, useMatches } from 'react-router-dom'
import classes from '../Page.module.css'

function Breadcrumbs() {
    const matches = useMatches()
    const location = useLocation()

    const finalMatch = matches.filter(
        (match) => match.pathname === location.pathname
    )
    const {
        params: { store, namespace, key },
    } = finalMatch[0]

    const storeLabels = {
        dataStore: 'DataStore',
        userDataStore: 'User DataStore',
    }

    return (
        <ul className={classes.list}>
            {store && (
                <>
                    <Link to={`/${store}`}>
                        <b>{storeLabels[store]}</b>
                    </Link>
                    <span>/</span>
                </>
            )}
            {namespace && (
                <>
                    <Link to={`/${store}/edit/${namespace}`}>
                        <b>{namespace}</b>
                    </Link>
                    <span>/</span>
                </>
            )}
            {key && (
                <>
                    <Link to={`/${store}/edit/${namespace}/${key}`}>
                        <b>{key}</b>
                    </Link>
                </>
            )}
        </ul>
    )
}

export default Breadcrumbs
