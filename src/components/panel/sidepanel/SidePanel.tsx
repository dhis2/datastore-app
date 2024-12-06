import React, { useState } from 'react'
import { ErrorResponse } from '../error/ErrorComponent'
import classes from '../Panel.module.css'
import CreateButton from './CreateButton'
import PanelLinksList from './PanelLinksList'
import PanelSearchField from './SearchField'
import i18n from '../../../locales'
import CreateModal from '../modals/CreateModal'
import { useDataEngine } from '@dhis2/app-service-data'
import { useNavigate, useParams } from 'react-router'

type SidePanelProps = {
    data: { results: [] }
    error: { details: ErrorResponse }
    loading: boolean
    refetchList: () => void
    type: string
}

export type CreateFieldValues = {
    namespace?: string,
    key?: string
}

const SidePanel = ({
    data,
    error,
    loading,
    refetchList,
    type,
}: SidePanelProps) => {
    const engine = useDataEngine()
    const navigate = useNavigate()
    const { store, namespace: currentNamespace } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [values, setValues] = useState({})

    // const { showSuccess, showError } = useCustomAlert()

    const handleCreate = async (values: CreateFieldValues) => {
        let resource = ''
        if (type === 'namespace') {
            resource = `${store}/${values?.namespace}/${values?.key}`
        } else {
            resource = `${store}/${currentNamespace}/${values?.key}`
        }

        await engine.mutate(
            {
                type: 'create',
                resource,
                data: () => ({}),
            },
            {
                onComplete: () => {
                    let url = ''
                    if (type === 'namespace') {
                        url = `${store}/edit/${values?.namespace}/${values?.key}`
                    } else {
                        url = `${values?.key}`
                    }
                    const message = i18n.t('Key created successfully')
                    // showSuccess(message)
                    navigate(url)
                    setValues({})
                },
                onError: () => {
                    const message = i18n.t(
                        'There was an error creating the key'
                    )
                    // showError(message)
                },
            }
        )
        setOpenModal(false)
    }

    const derivedModalProps = {
        title: type === "namespace" ? i18n.t("Add New Namespace") : i18n.t("Add New Key"),
        buttonLabel: type === "namespace" ? i18n.t("Add Namespace") : i18n.t("Add Key"),
    }
    const createButtonLabel = type === "namespace" ? i18n.t("New namespace") : i18n.t("New key");

    return (
        <>
        <div className={classes.sidebarContent}>
            <PanelSearchField />
            <CreateButton
                label={createButtonLabel}
                handleClick={() => setOpenModal(true)}
             />
            <PanelLinksList
                data={data}
                error={error}
                loading={loading}
                refetchList={refetchList}
                type={type}
            />
        </div>
        {openModal && (
            <CreateModal
                createFn={handleCreate}
                values={values}
                setValues={setValues}
                closeModal={() => setOpenModal(false)}
                type={type}
                {...derivedModalProps}
            />
        )}
        </>
    )
}

export default SidePanel
