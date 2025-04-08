import React from 'react'
import classes from '../../App.module.css'

type HeaderProps = {
    children?: React.ReactNode
}

export default function PanelHeader({ children }: Readonly<HeaderProps>) {
    return (
        <div className={classes.panelHeader} data-test="panel-header">
            {children}
        </div>
    )
}
