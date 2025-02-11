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

const customAlphaNumeric = (value) =>
    alphaNumeric(value)
        ? i18n.t('Special characters are not allowed in this field')
        : undefined

const TextField = ({
    initialFocus,
    name,
    label,
    required,
}: {
    initialFocus?: boolean
    name: string
    label: string
    required?: boolean
}) => {
    return (
        <Field
            name={name}
            component={InputFieldFF}
            required={required}
            label={label}
            validate={composeValidators(hasValue, customAlphaNumeric)}
            initialFocus={initialFocus}
            helpText={i18n.t('Alphanumeric characters only')}
        />
    )
}

export default TextField
