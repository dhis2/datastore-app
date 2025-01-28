import { IconShare16 } from '@dhis2/ui-icons'
import { Button } from '@dhis2-ui/button'
import React from 'react'
import i18n from '../../locales'

export default function SharingAction() {
    return (
        <Button
            aria-label={i18n.t('Share')}
            icon={<IconShare16 />}
            name="share"
            onClick={() => console.log('open sharing dialog')}
            title={i18n.t('Share')}
        />
    )
}
