import React from 'react'
import classes from '../../App.module.css'

type HeaderProps = {
    children?: React.ReactNode
}

export default function PanelHeader({ children }: HeaderProps) {
    return <div className={classes.panelHeader}>{children}</div>
}
