import {
    ReactFinalForm,
    InputFieldFF,
    hasValue,
    composeValidators,
    createMaxCharacterLength,
} from '@dhis2/ui'
import React from 'react'

const { Field } = ReactFinalForm

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
            validate={composeValidators(
                hasValue,
                createMaxCharacterLength(255)
            )}
            initialFocus={initialFocus}
        />
    )
}

export default TextField
