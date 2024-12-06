import { NoticeBox } from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'
import i18n from '../../locales'
import EmptyPanelEditor from './EmptyPanelEditor'
import classes from './Panel.module.css'
import { PanelHeader } from './PanelHeader'

const PanelEmptyArea = () => {
    const { store, namespace } = useParams()
    return (
        <>
            <div className={classes.sidebar}>
                <PanelHeader>
                    <span>Keys Panel</span>
                </PanelHeader>
                {store && !namespace && (
                    <div className={classes.sidebarContent}>
                        <NoticeBox title={i18n.t('View keys')}>
                            {i18n.t('Click a namespace to view its keys')}
                        </NoticeBox>
                    </div>
                )}
            </div>
            <EmptyPanelEditor />
        </>
    )
}
export default PanelEmptyArea
