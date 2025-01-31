import React from 'react'
import i18n from '../../locales'
import TextField from './TextField'

const NamespaceField = ({ initialFocus }: { initialFocus?: boolean }) => {
    return (
        <TextField
            name="namespace"
            label={i18n.t('Namespace')}
            initialFocus={initialFocus}
            required
        />
    )
}

export default NamespaceField
