import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import { IconAdd24, colors } from '@dhis2/ui'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import ErrorNotice from '../error/ErrorNotice'
import CenteredLoader from '../loader/Loader'
import CreateModal from '../modals/CreateModal'
import { KeysField, NamespaceField } from '../modals/Fields'
import ItemsTable from '../table/ItemsTable'
import CreateButton from './CreateButton'
import SearchField from './SearchField'

interface QueryResults {
    results: []
}

const NamespaceDataSection = ({ query }) => {
    const engine = useDataEngine()
    const navigate = useNavigate()
    const { store } = useParams()
    const [openCreateModal, setOpenCreateModal] = useState(false)

    const { showError, showSuccess } = useCustomAlert()

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(query)

    const handleCreate = async (values) => {
        await engine.mutate(
            {
                type: 'create',
                resource: `${store}/${values?.namespace}/${values?.key}`,
                data: () => ({}),
            },
            {
                onComplete() {
                    showSuccess(
                        i18n.t(
                            "Namespace '{{namespace}}' and key '{{key}}' added successfully!",
                            {
                                namespace: values.namespace,
                                key: values.key,
                            }
                        )
                    )
                    refetch()
                    navigate(`edit/${values?.namespace}`)
                    setOpenCreateModal(false)
                },
                onError(error) {
                    showError(
                        i18n.t(
                            'There was a problem adding this namespace - {{error}}',
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

    if (error) {
        return <ErrorNotice />
    }

    if (loading) {
        return <CenteredLoader />
    }

    return (
        <>
            <div className={classes.midSection}>
                <SearchField placeholder={i18n.t('Search namespaces')} />
                <CreateButton
                    label={i18n.t('New namespace')}
                    handleClick={() => setOpenCreateModal(true)}
                    icon={<IconAdd24 color={colors.grey600} />}
                />
            </div>
            <div>
                {data && <ItemsTable data={data} label={i18n.t('Namespace')} />}
            </div>
            {openCreateModal && (
                <CreateModal
                    title={i18n.t('Add New Namespace')}
                    closeModal={() => setOpenCreateModal(false)}
                    handleCreate={handleCreate}
                >
                    <NamespaceField initialFocus />
                    <KeysField />
                </CreateModal>
            )}
        </>
    )
}

export default NamespaceDataSection
