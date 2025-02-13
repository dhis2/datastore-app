import { useDataQuery } from '@dhis2/app-runtime'
import { SharingDialog } from '@dhis2/ui'
import { IconShare16 } from '@dhis2/ui-icons'
import { Button } from '@dhis2-ui/button'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DATASTORE } from '../../constants/constants'
import i18n from '../../locales'

interface SharingActionProps {
    dataStoreKey: string
}

export default function SharingAction({ dataStoreKey }: SharingActionProps) {
    const [openSharingDialog, setOpenSharingDialog] = useState(false)
    const { namespace: currentNamespace } = useParams()
    const { data: keyMetaData } = useDataQuery({
        metadata: {
            resource: `dataStore/${currentNamespace}/${dataStoreKey}/metaData`,
        },
    })

    return (
        <>
            <Button
                aria-label={i18n.t('Share')}
                icon={<IconShare16 />}
                name="share"
                onClick={() => setOpenSharingDialog(true)}
                title={i18n.t('Share')}
            />
            {openSharingDialog && (
                <SharingDialog
                    type={DATASTORE}
                    id={keyMetaData?.['metadata']?.['id']}
                    onClose={() => setOpenSharingDialog(false)}
                />
            )}
        </>
    )
}
