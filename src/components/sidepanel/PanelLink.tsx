import { IconFile16, IconFolder16, IconFolderOpen16 } from '@dhis2/ui-icons'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSidePanelContext } from '../../context/SidePanelContext'
import classes from '../Panel.module.css'
import ContextMenuButton from './ContextButton'

type SidePanelLinkProps = {
    label: string
    to: string
    type: string
}

const SidePanelLink = ({ to, label, type }: SidePanelLinkProps) => {
    const { setSelectedLinkItem } = useSidePanelContext()
    const [openContextMenu, setOpenContextMenu] = useState(false)

    const handleContextMenu = () => {
        setSelectedLinkItem(label)
        setOpenContextMenu((prev) => !prev)
    }
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
                    </>
                )}
            </NavLink>
            <ContextMenuButton
                handleContextMenu={handleContextMenu}
                openContextMenu={openContextMenu}
                setOpenContextMenu={setOpenContextMenu}
            />
        </li>
    )
}

export default SidePanelLink
