import { useDataEngine } from '@dhis2/app-runtime'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { SidePanelContextProvider } from '../../context/SidePanelContext'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import { ErrorResponse } from '../error/ErrorComponent'
import CreateModal from '../modals/CreateModal'
import classes from '../Panel.module.css'
import CreateButton from './CreateButton'
import CenteredLoader from './Loader'
import PanelLinksList from './PanelLinksList'
import PanelSearchField from './SearchField'

type SidePanelProps = {
    data: { results: [] }
    error: { details: ErrorResponse }
    loading: boolean
    refetchList: () => void
    type: string
}

export type CreateFieldValues = {
    namespace?: string
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
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [values, setValues] = useState({})

    const { showSuccess, showError } = useCustomAlert()

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
                    showSuccess(message)
                    navigate(url)
                    setValues({})
                },
                onError: () => {
                    const message = i18n.t(
                        'There was an error creating the key'
                    )
                    showError(message)
                },
            }
        )
        setOpenCreateModal(false)
    }

    if (error) {
        throw new Response('', {
            status: error?.details.httpStatusCode,
            statusText: error?.details.status || error.details.message,
        })
    }

    return (
        <SidePanelContextProvider
            panelType={type}
            totalItems={data?.results?.length}
        >
            <div className={classes.sidebarContent}>
                <PanelSearchField />
                <CreateButton handleClick={() => setOpenCreateModal(true)} />
                {loading && <CenteredLoader />}
                <PanelLinksList data={data} refetchList={refetchList} />
            </div>
            {openCreateModal && (
                <CreateModal
                    createFn={handleCreate}
                    values={values}
                    setValues={setValues}
                    closeModal={() => setOpenCreateModal(false)}
                />
            )}
        </SidePanelContextProvider>
    )
}

export default SidePanel
