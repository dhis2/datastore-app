import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader, SharingDialog } from '@dhis2/ui'
import { IconShare16 } from '@dhis2/ui-icons'
import { Button } from '@dhis2-ui/button'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DATASTORE } from '../../constants/constants'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'

interface SharingActionProps {
    dataStoreKey: string
}

export default function SharingAction({
    dataStoreKey,
}: Readonly<SharingActionProps>) {
    const { namespace: currentNamespace } = useParams()
    const [openSharingDialog, setOpenSharingDialog] = useState(false)
    const [keyID, setKeyID] = useState(null)
    const { showError } = useCustomAlert()

    const { loading, refetch } = useDataQuery(
        {
            metadata: {
                resource: `dataStore/${currentNamespace}/${dataStoreKey}/metaData`,
            },
        },
        {
            lazy: true,
            onComplete(data) {
                if (data?.['metadata']?.['id']) {
                    setKeyID(data['metadata']['id'])
                    setOpenSharingDialog(true)
                }
            },
            onError() {
                showError(i18n.t("There was a problem fetching this key's ID"))
            },
        }
    )

    if (loading) {
        return <CircularLoader extrasmall />
    }

    return (
        <>
            <Button
                aria-label={i18n.t('Share')}
                icon={<IconShare16 />}
                name="share"
                onClick={() => {
                    refetch()
                }}
                title={i18n.t('Share')}
            />
            {openSharingDialog && (
                <SharingDialog
                    type={DATASTORE}
                    id={keyID}
                    onClose={() => {
                        setOpenSharingDialog(false)
                        setKeyID(null)
                    }}
                />
            )}
        </>
    )
}
