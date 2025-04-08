import React from 'react'
import classes from '../../App.module.css'

type HeaderProps = {
    children?: React.ReactNode
}

export default function PageHeader({ children }: Readonly<HeaderProps>) {
    return (
        <div data-test="page-header" className={classes.pageHeader}>
            {children}
        </div>
    )
}
