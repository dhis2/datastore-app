import React from 'react'
import i18n from '../../locales'
import EmptyPanelEditor from '../empty/EmptyEditor'
import ErrorComponent from './ErrorComponent'

export default function ErrorPanel() {
    return (
        <>
            <ErrorComponent />
            <EmptyPanelEditor placeholder={i18n.t('Error')} />
        </>
    )
}
