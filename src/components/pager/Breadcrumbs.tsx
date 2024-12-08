import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Page.module.css'

function Breadcrumbs() {
    return (
        <ul className={classes.list}>
            <Link to={'/dataStore'}>
                <b>DataStore</b>
            </Link>
            /
            <Link to={'/dataStore/edit/namespace'}>
                <b>Key</b>
            </Link>
            /
            <Link to={'/dataStore/edit/namespace/key'}>
                <b>Value</b>
            </Link>
        </ul>
    )
}

export default Breadcrumbs
