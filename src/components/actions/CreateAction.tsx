import React, { useState } from 'react'
import i18n from '../../locales'
import { FieldValues } from '../sections/NamespaceSections'
import CreateButton from './CreateButton'
import CreateModal from './CreateModal'

type CreateActionProps = {
    type: string
    handleCreate: () => void
    values: FieldValues
    setValues: React.Dispatch<React.SetStateAction<FieldValues>>
}

function CreateAction({
    type,
    handleCreate,
    values,
    setValues,
}: CreateActionProps) {
    const [openModal, setOpenModal] = useState(false)
    const label = type === 'key' ? i18n.t('New Key') : i18n.t('New Namespace')

    return (
        <>
            <CreateButton
                label={label}
                handleClick={() => {
                    setOpenModal(true)
                }}
            />
            {openModal && (
                <CreateModal
                    closeModal={() => setOpenModal(false)}
                    createFn={() => {
                        setOpenModal(false)
                        handleCreate()
                    }}
                    values={values}
                    setValues={setValues}
                    type={type}
                />
            )}
        </>
    )
}

export default CreateAction
