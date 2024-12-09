import { IconEdit16, IconMore16 } from '@dhis2/ui-icons'
import { Button } from '@dhis2-ui/button'
import React from 'react'
import i18n from '../../locales'

export function EditButton({ handleClick }: { handleClick: () => void }) {
    return (
        <Button
            aria-label={i18n.t('Edit')}
            icon={<IconEdit16 />}
            name="create"
            onClick={handleClick}
            title={i18n.t('Edit')}
        />
    )
}

export function ContextButton() {
    return (
        <Button
            aria-label={i18n.t('More')}
            icon={<IconMore16 />}
            name="create"
            onClick={() => console.log('more')}
            title={i18n.t('Delete')}
        />
    )
}
