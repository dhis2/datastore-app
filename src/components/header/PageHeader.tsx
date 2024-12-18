import React from 'react'
import classes from '../../App.module.css'

type HeaderProps = {
    children?: React.ReactNode
}

export default function PageHeader({ children }: HeaderProps) {
    return <div className={classes.pageHeader}>{children}</div>
}
