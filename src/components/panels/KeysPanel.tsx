import { IconAdd16, colors } from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import CreateButton from '../sections/CreateButton'
import PanelHeader from '../header/PanelHeader'
import SearchField from '../sections/SearchField'
import ItemsTable from '../table/ItemsTable'

const KeysPanel = () => {
    const { namespace } = useParams()

    const data = {
        results: [
            'settings',
            'configuration',
            'source',
            'managed_versions',
            'configuration_managed',
            'settings_old',
            'virtual_storage',
        ],
    }

    return (
        <>
            <PanelHeader>
                <span className={classes.keysPanelHeader}>
                    {namespace} {i18n.t('Keys')}
                </span>
                <CreateButton
                    label={i18n.t('New Key')}
                    handleClick={() => console.log('create new key')}
                    icon={<IconAdd16 color={colors.grey600} />}
                />
            </PanelHeader>

            <div className={classes.keysPanelMidSection}>
                <SearchField placeholder={i18n.t('Search keys')} />
            </div>
            <div>
                {data && <ItemsTable data={data} label={i18n.t('Key')} />}
            </div>
        </>
    )
}

export default KeysPanel
