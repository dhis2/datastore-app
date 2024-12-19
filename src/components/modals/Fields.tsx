import {
    ReactFinalForm,
    InputFieldFF,
    hasValue,
    composeValidators,
    alphaNumeric,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'

const { Field } = ReactFinalForm

export const KeysField = ({ initialFocus }: { initialFocus?: boolean }) => {
    return (
        <Field
            name="key"
            component={InputFieldFF}
            required
            label={i18n.t('Key')}
            validate={composeValidators(hasValue, alphaNumeric)}
            initialFocus={initialFocus}
        />
    )
}

export const NamespaceField = ({
    initialFocus,
}: {
    initialFocus?: boolean
}) => {
    return (
        <Field
            name="namespace"
            component={InputFieldFF}
            required
            label={i18n.t('Namespace')}
            validate={composeValidators(hasValue, alphaNumeric)}
            initialFocus={initialFocus}
        />
    )
}
