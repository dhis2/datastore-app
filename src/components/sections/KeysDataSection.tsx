import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import useDiscardAlert from '../../hooks/useDiscardAlert'
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
import ItemsTable from '../table/ItemsTable'

interface QueryResults {
    results: []
}

const KeysDataSection = ({ query }) => {
    const engine = useDataEngine()
    const navigate = useNavigate()
    const { store, namespace: currentNamespace, key } = useParams()

    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedKey, setSelectedKey] = useState(null)
    const [activeRow, setActiveRow] = useState(null)

    const { showError, showSuccess } = useCustomAlert()
    const discardAlert = useDiscardAlert()

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

    const handleKeyRowClick = (row) => {
        const handler = () => {
            setHasUnsavedChanges(null)
            setActiveRow(row)
            navigate(`${row}`)
        }

        if (hasUnsavedChanges) {
            discardAlert.show({
                onConfirm: handler,
            })
        } else {
            handler()
        }
    }

    const handleDeleteActionClick = (item) => {
        const action = () => {
            setOpenDeleteModal(true)
            setSelectedKey(item)
        }
        if (hasUnsavedChanges && item === activeRow) {
            discardAlert.show({
                onConfirm: () => {
                    setHasUnsavedChanges(null)
                    action()
                },
            })
        } else {
            action()
        }
    }

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
                i18n.t("Key '{{selectedKey}}' deleted successfully", {
                    selectedKey,
                })
            )
            const navigatePath = namespaceHasMultipleKeys
                ? `/${store}/edit/${currentNamespace}`
                : `/${store}`

            if (selectedKey === activeRow) {
                navigate(navigatePath)
            }

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
