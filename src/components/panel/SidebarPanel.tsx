import React from 'react'
import CreateButton from './CreateButton'
import classes from './Panel.module.css'
import { ErrorResponse } from './PanelError'
import PanelLinksList from './PanelLinksList'
import PanelSearchField from './SearchField'

type SidebarPanelProps = {
    data: { results: [] }
    error: { details: ErrorResponse }
    loading: boolean
    refetchList: () => void
    type: string
}

const SidebarPanel = ({
    data,
    error,
    loading,
    refetchList,
    type,
}: SidebarPanelProps) => {
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

export default SidebarPanel
