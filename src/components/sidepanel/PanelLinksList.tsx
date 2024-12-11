import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorResponse } from '../error/ErrorComponent'
import classes from '../Panel.module.css'
import CenteredLoader from './Loader'
import SidePanelLink from './PanelLink'

type PanelLinksListProps = {
    data: { results: [] }
    error: { details: ErrorResponse }
    loading: boolean
    refetchList: () => void
    type: string
}

function PanelLinksList({
    data,
    error,
    loading,
    refetchList,
    type,
}: PanelLinksListProps) {
    const { store, namespace, key } = useParams()
    // const [selectedLink, setSelectedLink] = useState('')

    useEffect(() => {
        refetchList()
    }, [store, namespace, key, refetchList])

    if (error) {
        throw new Response('', {
            status: error?.details.httpStatusCode,
            statusText: error?.details.status || error.details.message,
        })
    }

    return (
        <div className={classes.sidebarList}>
            {loading && <CenteredLoader />}
            {data && (
                <ul>
                    {data.results.map((value: string, index) => {
                        const path =
                            type === 'namespace'
                                ? `/${store}/edit/${value}`
                                : `/${store}/edit/${namespace}/${value}`
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
        </div>
    )
}

export default PanelLinksList
