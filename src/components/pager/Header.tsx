import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import classes from './Page.module.css'

type HeaderProps = {
    children?: React.ReactElement
}

export default function Header({ children }: HeaderProps) {
    return (
        <div className={classes.pageHeader}>
            <Breadcrumbs />
            {children}
        </div>
    )
}
