import { IconDelete16 } from '@dhis2/ui-icons'
import { Button } from '@dhis2-ui/button'
import React from 'react'
import i18n from '../../locales'

interface DeleteActionProps {
    handleDeleteBtnClick: () => void
}

export default function DeleteAction({
    handleDeleteBtnClick,
}: Readonly<DeleteActionProps>) {
    return (
        <Button
            aria-label={i18n.t('Delete')}
            icon={<IconDelete16 />}
            name="delete"
            onClick={handleDeleteBtnClick}
            title={i18n.t('Delete')}
            dataTest="delete-action-button"
        />
    )
}
