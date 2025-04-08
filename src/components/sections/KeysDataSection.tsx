import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import React, { useEffect, useState } from 'react'
import { useBlocker, useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import useSearchFilter from '../../hooks/useSearchFilter'
import i18n from '../../locales'
import { useEditContext } from '../context/EditContext'
import ErrorNotice from '../error/ErrorNotice'
import KeyField from '../fields/KeyField'
import SearchField from '../fields/SearchField'
import KeysPanelHeader from '../header/KeysPanelHeader'
import CenteredLoader from '../loader/Loader'
import CreateModal from '../modals/CreateModal'
import DeleteModal from '../modals/DeleteModal'
import DiscardModal from '../modals/DiscardModal'
import { dataStoreKeysQuery } from '../panels/KeysPanel'
import ItemsTable from '../table/ItemsTable'

interface QueryResults {
    results: []
}

type KeysDataSectionProps = { query: typeof dataStoreKeysQuery }

const KeysDataSection = ({ query }: KeysDataSectionProps) => {
    const engine = useDataEngine()
    const navigate = useNavigate()
    const { store, namespace: currentNamespace, key } = useParams()

    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedKey, setSelectedKey] = useState(null)
    const [activeRow, setActiveRow] = useState(null)

    const { showError, showSuccess } = useCustomAlert()

    const { hasUnsavedChanges, setHasUnsavedChanges } = useEditContext()

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        query,
        {
            variables: {
                id: currentNamespace,
            },
        }
    )

    const { searchTerm, setSearchTerm, filteredData } = useSearchFilter(
        data?.results
    )

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            hasUnsavedChanges &&
            currentLocation.pathname !== nextLocation.pathname
    )

    const handleKeyRowClick = (row) => {
        navigate(`${row}`)
        if (key === row) {
            setActiveRow(row)
        }
    }

    const handleDeleteActionClick = (item) => {
        setOpenDeleteModal(true)
        setSelectedKey(item)
    }

    const numberOfKeysInNamespace = data?.results?.length
    const currentKeyHasUnsavedChanges =
        activeRow === selectedKey && hasUnsavedChanges

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
            if (activeRow === selectedKey) {
                setHasUnsavedChanges(null)
            }
            setOpenDeleteModal(false)
            showSuccess(
                i18n.t("Key '{{selectedKey}}' deleted successfully", {
                    selectedKey,
                })
            )
            const navigatePath = namespaceHasMultipleKeys
                ? `/${store}/edit/${currentNamespace}`
                : `/${store}`

            setTimeout(() => {
                navigate(navigatePath)
            }, 50)

            if (namespaceHasMultipleKeys) {
                refetch({ id: currentNamespace })
            }
        }

        const onError = (error) => {
            setOpenDeleteModal(false)
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
        return () => {
            if (blocker.state == 'blocked') {
                blocker.reset()
            }
        }
    }, [blocker])

    useEffect(() => {
        refetch({ id: currentNamespace })
    }, [currentNamespace, refetch])

    useEffect(() => {
        setActiveRow(key)
    }, [key])

    if (error) {
        return <ErrorNotice />
    }

    if (loading) {
        return <CenteredLoader />
    }

    return (
        <>
            <KeysPanelHeader setOpenCreateModal={setOpenCreateModal} />
            <div className={classes.keysPanelMidSection}>
                <SearchField
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder={i18n.t('Search keys')}
                />
            </div>
            <div>
                {filteredData && (
                    <ItemsTable
                        activeRow={activeRow}
                        tableData={filteredData}
                        label={i18n.t('Key')}
                        handleDeleteAction={handleDeleteActionClick}
                        handleRowClick={handleKeyRowClick}
                    />
                )}
            </div>
            {openCreateModal && (
                <CreateModal
                    title={i18n.t('Add New Key')}
                    closeModal={() => setOpenCreateModal(false)}
                    handleCreate={handleCreate}
                >
                    <KeyField initialFocus />
                </CreateModal>
            )}
            {openDeleteModal && (
                <DeleteModal
                    closeModal={() => {
                        setOpenDeleteModal(false)
                    }}
                    handleDelete={handleDelete}
                    title={i18n.t('Delete Key')}
                >
                    <p>
                        {currentKeyHasUnsavedChanges && (
                            <span>
                                {i18n.t('This key has unsaved changes.')}
                            </span>
                        )}{' '}
                        <span>
                            {i18n.t(
                                `Are you sure you want to delete '${selectedKey}' in ${currentNamespace}?`
                            )}
                        </span>
                    </p>
                    {numberOfKeysInNamespace < 2 && (
                        <p>
                            {i18n.t(
                                `This will also delete the namespace '${currentNamespace}'`
                            )}
                        </p>
                    )}
                </DeleteModal>
            )}
            {blocker.state === 'blocked' && hasUnsavedChanges && (
                <DiscardModal
                    handleDiscard={() => {
                        setHasUnsavedChanges(null)
                        blocker.proceed()
                    }}
                    closeModal={() => blocker.reset()}
                />
            )}
        </>
    )
}

export default KeysDataSection
