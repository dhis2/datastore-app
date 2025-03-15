import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import { IconAdd24, colors } from '@dhis2/ui'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import useSearchFilter from '../../hooks/useSearchFilter'
import i18n from '../../locales'
import ErrorNotice from '../error/ErrorNotice'
import SearchField from '../fields/SearchField'
import CenteredLoader from '../loader/Loader'
import CreateModal from '../modals/CreateModal'
import DeleteModal from '../modals/DeleteModal'
import { dataStoreNamespacesQuery } from '../pages/Namespaces'
import ItemsTable from '../table/ItemsTable'
import CreateButton from './CreateButton'

interface QueryResults {
    results: []
}

type NamespaceDataSectionProps = {
    query: typeof dataStoreNamespacesQuery
}

const NamespaceDataSection = ({ query }: NamespaceDataSectionProps) => {
    const engine = useDataEngine()
    const navigate = useNavigate()
    const { store } = useParams()

    const { showError, showSuccess } = useCustomAlert()

    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [activeRow, setActiveRow] = useState(null)
    const [selectedNamespace, setSelectedNamespace] = useState(null)

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(query)

    const { searchTerm, setSearchTerm, filteredData } = useSearchFilter(
        data?.results
    )

    const handleNamespaceRowClick = (row) => {
        setActiveRow(row)
        navigate(`edit/${row}`)
    }

    const handleDeleteActionClick = (item) => {
        setOpenDeleteModal(true)
        setSelectedNamespace(item)
    }

    const handleCreate = async (values) => {
        await engine.mutate(
            {
                type: 'create',
                resource: `${store}/${values?.namespace}/${values?.key}`,
                data: () => ({}),
            },
            {
                onComplete() {
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

    const handleDelete = async () => {
        await engine.mutate(
            {
                type: 'delete' as const,
                resource: `${store}`,
                id: selectedNamespace,
            },
            {
                onComplete: () => {
                    setOpenDeleteModal(false)
                    refetch()
                    showSuccess(
                        i18n.t(
                            "Namespace '{{namespace}}' deleted successfully",
                            {
                                namespace: selectedNamespace,
                            }
                        )
                    )
                },
                onError(error) {
                    showError(
                        i18n.t(
                            'There was a problem deleting this namespace - {{error}}',
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
                <SearchField
                    placeholder={i18n.t('Search namespaces')}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <CreateButton
                    label={i18n.t('New namespace')}
                    handleClick={() => setOpenCreateModal(true)}
                    icon={<IconAdd24 color={colors.grey600} />}
                    className={classes.createNamespace}
                />
            </div>
            <div>
                {filteredData && (
                    <ItemsTable
                        activeRow={activeRow}
                        tableData={filteredData}
                        label={i18n.t('Namespace')}
                        handleDeleteAction={handleDeleteActionClick}
                        handleRowClick={handleNamespaceRowClick}
                    />
                )}
            </div>
            {openCreateModal && (
                <CreateModal
                    title={i18n.t('Add New Namespace')}
                    closeModal={() => setOpenCreateModal(false)}
                    handleCreate={handleCreate}
                    type={'namespace'}
                />
            )}
            {openDeleteModal && (
                <DeleteModal
                    closeModal={() => setOpenDeleteModal(false)}
                    handleDelete={handleDelete}
                    title={i18n.t('Delete Namespace')}
                    type={'namespace'}
                    activeNamespace={selectedNamespace}
                />
            )}
        </>
    )
}

export default NamespaceDataSection
