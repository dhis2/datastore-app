import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ContextButton, EditButton } from '../../buttons/Buttons'
import classes from '../../Page.module.css'
import DeleteButton from './DeleteButton'
import DeleteModal from './DeleteModal'

type TableActionProps = {
    item: string
}

const TableActions = ({ item }: TableActionProps) => {
    const navigate = useNavigate()
    const { namespace } = useParams()

    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div className={classes.actionButtons}>
                <EditButton
                    handleClick={() => {
                        if (namespace) {
                            navigate(`${item}`)
                        } else {
                            navigate(`edit/${item}`)
                        }
                    }}
                />
                <DeleteButton openModal={() => setOpenModal(true)} />
                <ContextButton />
            </div>
            {openModal && (
                <DeleteModal
                    closeModal={() => setOpenModal(false)}
                    deleteFn={() => {
                        console.log('immersion')
                        setOpenModal(false)
                    }}
                >
                    <p>Delete modal fields</p>
                </DeleteModal>
            )}
        </>
    )
}

export default TableActions
