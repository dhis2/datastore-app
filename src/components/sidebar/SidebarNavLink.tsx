import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from '../../App.module.css'

const SidebarNavLink = ({ to, label }) => {
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
        </li>
    )
}

SidebarNavLink.propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
}

export default SidebarNavLink
