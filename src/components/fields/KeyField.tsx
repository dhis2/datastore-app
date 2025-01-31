import React from 'react'
import i18n from '../../locales'
import TextField from './TextField'

const KeyField = ({ initialFocus }: { initialFocus?: boolean }) => {
    return (
        <TextField
            name="key"
            label={i18n.t('Key')}
            initialFocus={initialFocus}
            required
        />
    )
}

export default KeyField
