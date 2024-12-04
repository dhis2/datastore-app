import { useDataEngine } from '@dhis2/app-service-data'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import DeleteModal from '../delete/DeleteModal'
import CenteredLoader from '../Loader'
import SidebarNavLink from '../sidebar/SidebarNavLink'

function LinksList({ data, error, loading, refetch }) {
    const { store, namespace, key } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [selectedNamespace, setSelectedNamespace] = useState('')
    const engine = useDataEngine()
    const navigate = useNavigate()

    const handleDeleteAction = async (selectedNamespace) => {
        await engine.mutate({
            type: 'delete',
            resource: `${store}/${selectedNamespace}`,
            id: key,
        })

        setOpenModal(false)
        refetch()
        navigate(`${store}`)
    }

    useEffect(() => {
        refetch()
    }, [store, namespace, key])
    return (
        <div className={classes.sidebarList}>
            {error && <span>{i18n.t('ERROR')}</span>}
            {loading && <CenteredLoader />}
            {data && (
                <>
                    <h4 className={classes.bottom}>{i18n.t('Namespaces')}</h4>
                    <ul>
                        {data.results.map((namespace: string, index) => {
                            return (
                                <SidebarNavLink
                                    key={`${index}-${namespace}`}
                                    to={`/${store}/${namespace}`}
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
    refetch: PropTypes.func,
}

export default LinksList
