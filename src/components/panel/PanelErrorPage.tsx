import React from 'react'
import i18n from '../../locales'
import EmptyPanelEditor from './EmptyPanelEditor'
import PanelError from './PanelError'

export default function PanelErrorPage() {
    return (
        <>
            <PanelError />
            <EmptyPanelEditor placeholder={i18n.t('Error')} />
        </>
    )
}
