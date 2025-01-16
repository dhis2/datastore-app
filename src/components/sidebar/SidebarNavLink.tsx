import { Button } from '@dhis2/ui'
import { IconDelete16 } from '@dhis2/ui-icons'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from '../../App.module.css'

const SidebarNavLink = ({ to, label, handleDeleteModal }) => {
    return (
        <li className={classes.navLink}>
            <NavLink
                to={to}
                className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                }
            >
                {label}
            </NavLink>
            <Button
                aria-label="Delete"
                icon={<IconDelete16 />}
                name="delete button"
                onClick={handleDeleteModal}
                title="Delete"
            />
        </li>
    )
}

SidebarNavLink.propTypes = {
    handleDeleteModal: PropTypes.func,
    label: PropTypes.string,
    to: PropTypes.string,
}

export default SidebarNavLink
