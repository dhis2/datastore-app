import { IconAdd16, colors } from '@dhis2/ui'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import { DATASTORE, USERDATASTORE } from '../../constants/constants'
import i18n from '../../locales'
import CreateButton from '../buttons/CreateButton'
import PanelHeader from '../header/PanelHeader'

const KeysPanelHeader = ({
    setOpenCreateModal,
}: {
    setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { namespace: currentNamespace, store } = useParams()
    return (
        <PanelHeader>
            <div
                className={classes.keysPanelHeaderLabel}
                data-test="keys-panel-header"
            >
                <Link to={`/${store}`} className={classes.dataStoreLink}>
                    <span>
                        {store === DATASTORE && 'DataStore'}
                        {store === USERDATASTORE && 'UserDataStore'}
                    </span>
                </Link>
                <span className={classes.labelDivider}>/</span>

                <span className={classes.namespaceLabel}>
                    {currentNamespace}
                </span>
            </div>
            <CreateButton
                label={i18n.t('New Key')}
                handleClick={() => setOpenCreateModal(true)}
                icon={<IconAdd16 color={colors.grey600} />}
            />
        </PanelHeader>
    )
}

export default KeysPanelHeader
