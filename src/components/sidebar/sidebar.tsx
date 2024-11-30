import { Card, Divider } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import { NameSpaceLinks } from '../namespaces/list'
import SearchField from './searchField'
import SelectDataStore from './select'

export const SidebarNavLink = ({ to, label }) => {
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

export const SidebarNavigation = () => {
    return (
        <>
            <SearchField />
            <NameSpaceLinks />
        </>
    )
}

const Sidebar = () => {
    const navigate = useNavigate()
    const { store } = useParams()
    const [option, setOption] = useState(store)

    const handleDataStoreSelect = ({ selected }) => {
        setOption(selected)
        navigate(`/${selected}`)
    }
    return (
        <Card className={classes.sidebarContent}>
            <SelectDataStore
                option={option}
                handleChange={handleDataStoreSelect}
            />
            <Divider />
            {store && <SidebarNavigation />}
        </Card>
    )
}

export default Sidebar
