import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSidePanelContext } from '../../context/SidePanelContext'
import {
    useDeleteKeyMutation,
    useDeleteNamespaceMutation,
} from '../../hooks/useDeleteMutation'
import DeleteModal from '../modals/DeleteModal'
import classes from '../Panel.module.css'
import SidePanelLink from './PanelLink'

type PanelLinksListProps = {
    data: { results: [] }
    refetchList: () => void
}

function PanelLinksList({ data, refetchList }: PanelLinksListProps) {
    const { store, namespace: currentNamespace, key } = useParams()
    const navigate = useNavigate()
    const {
        panelType: type,
        openDeleteModal,
        selectedLinkItem,
    } = useSidePanelContext()

    useEffect(() => {
        refetchList()
    }, [store, currentNamespace, key, refetchList])

    const handleDeleteAction =
        type === 'namespace'
            ? useDeleteNamespaceMutation({
                  namespace: selectedLinkItem,
                  store,
                  refetch: () => {
                      refetchList()
                      navigate(`${store}`)
                  },
              })
            : type === 'keys'
            ? data?.results?.length < 2
                ? useDeleteNamespaceMutation({
                      namespace: currentNamespace,
                      store,
                      refetch: () => {
                          navigate(`/${store}`)
                      },
                  })
                : useDeleteKeyMutation({
                      namespace: currentNamespace,
                      key: selectedLinkItem,
                      store,
                      refetch: refetchList,
                  })
            : null

    return (
        <div className={classes.sidebarList}>
            {data && (
                <ul>
                    {data.results.map((value: string, index) => {
                        const path =
                            type === 'namespace'
                                ? `/${store}/edit/${value}`
                                : `/${store}/edit/${currentNamespace}/${value}`
                        return (
                            <SidePanelLink
                                key={`${index}-${value}`}
                                to={path}
                                label={value}
                                type={type}
                            />
                        )
                    })}
                </ul>
            )}
            {openDeleteModal && (
                <DeleteModal handleDeleteAction={handleDeleteAction} />
            )}
        </div>
    )
}

export default PanelLinksList
