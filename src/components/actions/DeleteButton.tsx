import { IconDelete16 } from '@dhis2/ui-icons'
import { Button } from '@dhis2-ui/button'
import React from 'react'
import i18n from '../../locales'

export default function DeleteButton({
    openModal,
}: {
    openModal?: () => void
}) {
    return (
        <Button
            aria-label={i18n.t('Delete')}
            icon={<IconDelete16 />}
            name="create"
            onClick={openModal}
            title={i18n.t('Delete')}
        />
    )
}
