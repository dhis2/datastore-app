import { Button } from '@dhis2/ui'
import {
    IconFile16,
    IconMore16,
    IconFolder16,
    IconFolderOpen16,
} from '@dhis2/ui-icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from '../Panel.module.css'

type SidebarPanelLinkProps = {
    label: string
    to: string
    type: string
}

const SidebarPanelLink = ({ to, label, type }: SidebarPanelLinkProps) => {
    const renderIcon = ({ isActive }) =>
        type === 'namespace' ? (
            isActive ? (
                <IconFolderOpen16 />
            ) : (
                <IconFolder16 />
            )
        ) : (
            <IconFile16 />
        )
    return (
        <li className={classes.navLink}>
            <NavLink
                to={to}
                className={({ isActive }) => {
                    return isActive ? 'active' : ''
                }}
            >
                {({ isActive }) => (
                    <>
                        {renderIcon({ isActive })}
                        <span>{label}</span>
                        <Button
                            aria-label="More"
                            icon={<IconMore16 />}
                            name="more"
                            // onClick={}
                            title="More"
                        />
                    </>
                )}
            </NavLink>
        </li>
    )
}

export default SidebarPanelLink
