import { IconAdd16, colors } from '@dhis2/ui'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import { DATASTORE, USERDATASTORE } from '../../constants/constants'
import i18n from '../../locales'
import PanelHeader from '../header/PanelHeader'
import CreateButton from '../sections/CreateButton'

const KeysPanelHeader = ({
    setOpenCreateModal,
    showButton,
}: {
    setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>
    showButton: boolean
}) => {
    const { namespace: currentNamespace, store } = useParams()
    return (
        <PanelHeader>
            <div className={classes.keysPanelHeaderLabel}>
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
            {showButton ? (
                <CreateButton
                    label={i18n.t('New Key')}
                    handleClick={() => setOpenCreateModal(true)}
                    icon={<IconAdd16 color={colors.grey600} />}
                />
            ) : null}
        </PanelHeader>
    )
}

export default KeysPanelHeader
