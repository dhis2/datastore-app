import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarNavLink = ({ to, label }) => {
    return (
        <li>
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
