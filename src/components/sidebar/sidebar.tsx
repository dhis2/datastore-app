import { Card, Divider } from '@dhis2/ui'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import NameSpaceLinks from '../namespaces/NamespacesLinks'
import DataStoreSelect from './DataStoreSelect'
import SearchField from './SearchField'

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
            <DataStoreSelect
                option={option}
                handleChange={handleDataStoreSelect}
            />
            <Divider />
            {store && (
                <>
                    <SearchField />
                    <NameSpaceLinks />
                </>
            )}
        </Card>
    )
}

export default Sidebar
