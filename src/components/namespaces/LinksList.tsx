import { useDataEngine } from '@dhis2/app-service-data'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import DeleteModal from '../delete/DeleteModal'
import CenteredLoader from '../Loader'
import SidebarNavLink from '../sidebar/SidebarNavLink'

function LinksList({ data, error, loading, refetchList }) {
    const { store, namespace, key } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [selectedNamespace, setSelectedNamespace] = useState('')
    const engine = useDataEngine()
    const navigate = useNavigate()
    const { showError, showSuccess } = useCustomAlert()

    const handleDeleteAction = async (selectedNamespace) => {
        await engine.mutate(
            {
                type: 'delete',
                resource: `${store}/${selectedNamespace}`,
                id: key,
            },
            {
                onComplete: () => {
                    const message = i18n.t('Key deleted successfully', {
                        key,
                    })
                    showSuccess(message)
                },
                onError: (error) => {
                    const message = i18n.t(
                        'There was an error while deleting the key',
                        {
                            error: error.message,
                        }
                    )
                    showError(message)
                },
            }
        )

        setOpenModal(false)
        refetchList()
        navigate(`${store}`)
    }

    useEffect(() => {
        refetchList()
    }, [store, namespace, key])

    return (
        <div className={classes.sidebarList}>
            {error && <span>{i18n.t('Error fetching namespaces')}</span>}
            {loading && <CenteredLoader />}
            {data && (
                <>
                    <h4 className={classes.bottom}>{i18n.t('Namespaces')}</h4>
                    <ul>
                        {data.results.map((namespace: string, index) => {
                            return (
                                <SidebarNavLink
                                    key={`${index}-${namespace}`}
                                    to={`/${store}/edit/${namespace}`}
                                    label={namespace}
                                    handleDeleteModal={() => {
                                        setOpenModal(true)
                                        setSelectedNamespace(namespace)
                                    }}
                                />
                            )
                        })}
                    </ul>
                </>
            )}
            {openModal && (
                <DeleteModal
                    deleteFn={() => handleDeleteAction(selectedNamespace)}
                    closeModal={() => setOpenModal(false)}
                >
                    <p>
                        {i18n.t(
                            `Are you sure you want to delete '${namespace}'?`
                        )}
                    </p>
                    <p>
                        {i18n.t(
                            `This will delete all the keys in this namespace`
                        )}
                    </p>
                </DeleteModal>
            )}
        </div>
    )
}

LinksList.propTypes = {
    data: PropTypes.object,
    error: PropTypes.any,
    loading: PropTypes.any,
    refetchList: PropTypes.func,
}

export default LinksList
