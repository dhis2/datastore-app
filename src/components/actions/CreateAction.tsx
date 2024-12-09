import React, { useState } from 'react'
import i18n from '../../locales'
import CreateButton from './CreateButton'
import CreateModal from './CreateModal'

type CreateActionProps = {
    type: string
}

function CreateAction({ type }: CreateActionProps) {
    const [openModal, setOpenModal] = useState(false)
    const [values, setValues] = useState({})
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
                        console.log('flow state')
                        setOpenModal(false)
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
