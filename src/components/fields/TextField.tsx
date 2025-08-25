import {
    ReactFinalForm,
    InputFieldFF,
    hasValue,
    composeValidators,
    createMaxCharacterLength,
    createPattern
} from '@dhis2/ui'
import React from 'react'

const { Field } = ReactFinalForm

// source: https://stackoverflow.com/questions/1547899/which-characters-make-a-url-invalid/13500078#13500078
const invalidCharactersRegex = /^[^(){}[\]^|`;?:@=+$,\\]+$/ 

const invalidCharactersMessage = "Your input should not contain any of these invalid characters: {}|\\^[]`;?:@=+$,"
const validateInputCharacters = createPattern(invalidCharactersRegex, invalidCharactersMessage)

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
                createMaxCharacterLength(255),
                validateInputCharacters
            )}
            initialFocus={initialFocus}
        />
    )
}

export default TextField
