import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import { IconAdd16, colors } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import ErrorNotice from '../error/ErrorNotice'
import PanelHeader from '../header/PanelHeader'
import CenteredLoader from '../loader/Loader'
import CreateModal from '../modals/CreateModal'
import { KeysField } from '../modals/Fields'
import ItemsTable from '../table/ItemsTable'
import CreateButton from './CreateButton'
import SearchField from './SearchField'

interface QueryResults {
    results: []
}

const KeysDataSection = ({ query }) => {
    const engine = useDataEngine()
    const { store, namespace: currentNamespace } = useParams()

    const [openCreateModal, setOpenCreateModal] = useState(false)

    const { showError, showSuccess } = useCustomAlert()

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        query,
        {
            variables: {
                id: currentNamespace,
            },
        }
    )

    const handleCreate = async ({ key }) => {
        await engine.mutate(
            {
                type: 'create',
                resource: `${store}/${currentNamespace}/${key}`,
                data: () => ({}),
            },
            {
                onComplete() {
                    setOpenCreateModal(false)
                    showSuccess(
                        i18n.t("Key '{{key}}' added successfully", {
                            key,
                        })
                    )
                    refetch({ id: currentNamespace })
                },
                onError(error) {
                    showError(
                        i18n.t(
                            'There was a problem adding this key - {{error}}',
                            {
                                error: error.message,
                                interpolation: { escapeValue: false },
                            }
                        )
                    )
                },
            }
        )
    }

    useEffect(() => {
        refetch({ id: currentNamespace })
    }, [currentNamespace])

    if (error) {
        return <ErrorNotice />
    }

    if (loading) {
        return <CenteredLoader />
    }

    return (
        <>
            <PanelHeader>
                <span className={classes.keysPanelHeader}>
                    {currentNamespace} {i18n.t('keys')}
                </span>
                <CreateButton
                    label={i18n.t('New Key')}
                    handleClick={() => setOpenCreateModal(true)}
                    icon={<IconAdd16 color={colors.grey600} />}
                />
            </PanelHeader>
            <div className={classes.keysPanelMidSection}>
                <SearchField placeholder={i18n.t('Search keys')} />
            </div>
            <div>
                {data && <ItemsTable data={data} label={i18n.t('Key')} />}
            </div>
            {openCreateModal && (
                <CreateModal
                    title={i18n.t('Add New Key')}
                    closeModal={() => setOpenCreateModal(false)}
                    handleCreate={handleCreate}
                >
                    <KeysField initialFocus />
                </CreateModal>
            )}
        </>
    )
}

export default KeysDataSection
