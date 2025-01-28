import React from 'react'
import classes from '../Page.module.css'
import Breadcrumbs from './Breadcrumbs'

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
