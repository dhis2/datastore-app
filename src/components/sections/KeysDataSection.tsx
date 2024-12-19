import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import { IconAdd16, colors } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import { DATASTORE, USERDATASTORE } from '../../constants/constants'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import ErrorNotice from '../error/ErrorNotice'
import PanelHeader from '../header/PanelHeader'
import CenteredLoader from '../loader/Loader'
import CreateModal from '../modals/CreateModal'
import DeleteModal from '../modals/DeleteModal'
import { KeysField } from '../modals/Fields'
import ItemsTable from '../table/ItemsTable'
import CreateButton from './CreateButton'
import SearchField from './SearchField'

interface QueryResults {
    results: []
}

const KeysDataSection = ({ query }) => {
    const engine = useDataEngine()
    const navigate = useNavigate()
    const { store, namespace: currentNamespace } = useParams()

    const { showError, showSuccess } = useCustomAlert()

    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedKey, setSelectedKey] = useState(null)

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        query,
        {
            variables: {
                id: currentNamespace,
            },
        }
    )

    const numberOfKeysInNamespace = data?.results?.length

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

    const handleDelete = async () => {
        const namespaceHasMultipleKeys = numberOfKeysInNamespace > 1
        const resource = namespaceHasMultipleKeys
            ? `${store}/${currentNamespace}`
            : `${store}`
        const id = namespaceHasMultipleKeys ? selectedKey : currentNamespace

        const onComplete = () => {
            setOpenDeleteModal(false)
            showSuccess(
                i18n.t("Key '{{selectedKey}}' deleted successfully!", {
                    selectedKey,
                })
            )
            const navigatePath = namespaceHasMultipleKeys
                ? `/${store}/edit/${currentNamespace}`
                : `/${store}`
            navigate(navigatePath)

            if (namespaceHasMultipleKeys) {
                refetch({ id: currentNamespace })
            }
        }

        const onError = (error) => {
            showError(
                i18n.t('There was a problem deleting this key - {{error}}', {
                    error: error.message,
                    interpolation: { escapeValue: false },
                })
            )
        }

        await engine.mutate(
            {
                type: 'delete' as const,
                resource: resource,
                id: id,
            },
            {
                onComplete,
                onError,
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
                <div className={classes.keysHeaderLabel}>
                    <Link to={`/${store}`} className={classes.keysHeaderLink}>
                        <span>
                            {store === DATASTORE && 'DataStore'}
                            {store === USERDATASTORE && 'UserDataStore'}
                        </span>
                    </Link>
                    <span className={classes.keysHeaderLabelDivider}>/</span>

                    <span className={classes.keysPanelHeader}>
                        {currentNamespace}
                    </span>
                </div>
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
                {data && (
                    <ItemsTable
                        data={data}
                        label={i18n.t('Key')}
                        setOpenDeleteModal={setOpenDeleteModal}
                        setSelectedItem={setSelectedKey}
                    />
                )}
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
            {openDeleteModal && (
                <DeleteModal
                    closeModal={() => setOpenDeleteModal(false)}
                    handleDelete={handleDelete}
                    title={i18n.t('Delete Key')}
                >
                    {i18n.t(
                        `Are you sure you want to delete '${selectedKey}' in ${currentNamespace}?`
                    )}
                    {numberOfKeysInNamespace < 2 && (
                        <p>
                            {i18n.t(
                                `This will also delete the namespace '${currentNamespace}'`
                            )}
                        </p>
                    )}
                </DeleteModal>
            )}
        </>
    )
}

export default KeysDataSection
