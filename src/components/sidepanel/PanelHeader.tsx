import React from 'react'
import classes from '../Panel.module.css'

type PanelHeaderProps = {
    children?: React.ReactElement
}

export function PanelHeader({ children }: PanelHeaderProps) {
    return <div className={classes.panelHeader}>{children}</div>
}
