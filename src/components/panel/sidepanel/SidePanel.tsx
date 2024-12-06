import React from 'react'
import { ErrorResponse } from '../error/ErrorComponent'
import classes from '../Panel.module.css'
import CreateButton from './CreateButton'
import PanelLinksList from './PanelLinksList'
import PanelSearchField from './SearchField'

type SidePanelProps = {
    data: { results: [] }
    error: { details: ErrorResponse }
    loading: boolean
    refetchList: () => void
    type: string
}

const SidePanel = ({
    data,
    error,
    loading,
    refetchList,
    type,
}: SidePanelProps) => {
    console.log(data, type, 'sidebar panel')
    return (
        <div className={classes.sidebarContent}>
            <PanelSearchField />
            <CreateButton />
            <PanelLinksList
                data={data}
                error={error}
                loading={loading}
                refetchList={refetchList}
                type={type}
            />
        </div>
    )
}

export default SidePanel
