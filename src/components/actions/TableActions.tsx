import React from 'react'
import { useParams } from 'react-router-dom'
import i18n from '../../locales'
import classes from '../../Page.module.css'
import { ContextButton, EditButton } from './Buttons'
import DeleteButton from './DeleteButton'
import DeleteModal from './DeleteModal'

type TableActionProps = {
    selectedItem: string
    rowsLength: number
    handleEditAction: (string) => void
    handleDeleteAction: (string) => void
    openDeleteModal: boolean
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}

const TableActions = ({
    selectedItem,
    rowsLength,
    handleDeleteAction,
    handleEditAction,
    openDeleteModal,
    setOpenDeleteModal,
}: TableActionProps) => {
    const { store, namespace: currentNamespace } = useParams()

    const isKeyPage = Boolean(store && currentNamespace)
    const isNamespacePage = Boolean(store && !currentNamespace)

    const renderModalContent = () => {
        return (
            <>
                {isNamespacePage && (
                    <>
                        <p>
                            {i18n.t(
                                `Are you sure you want to delete '${selectedItem}'?`
                            )}
                        </p>
                        <p>
                            {i18n.t(
                                `This will delete all the keys in this namespace`
                            )}
                        </p>
                    </>
                )}
                {isKeyPage && (
                    <>
                        {i18n.t(
                            `Are you sure you want to delete '${selectedItem}' in ${currentNamespace}?`
                        )}
                        {rowsLength < 2 && (
                            <p>
                                {i18n.t(
                                    `This will also delete the namespace '${currentNamespace}'`
                                )}
                            </p>
                        )}
                    </>
                )}
            </>
        )
    }

    return (
        <>
            <div className={classes.actionButtons}>
                <EditButton
                    handleClick={() => handleEditAction({ selectedItem })}
                />
                <DeleteButton openModal={() => setOpenDeleteModal(true)} />
                <ContextButton />
            </div>
            {openDeleteModal && (
                <DeleteModal
                    closeModal={() => setOpenDeleteModal(false)}
                    deleteFn={() => {
                        handleDeleteAction({ selectedItem })
                    }}
                >
                    {renderModalContent()}
                </DeleteModal>
            )}
        </>
    )
}

export default TableActions
