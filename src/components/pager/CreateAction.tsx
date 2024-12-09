import React, { useState } from 'react'
import i18n from '../../locales'
import CreateButton from './buttons/CreateButton'
import CreateModal from './CreateModal'

function CreateAction({ type }) {
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
