import { PropTypes } from '@dhis2/prop-types'
import { CircularLoader } from '@dhis2/ui'
import React from 'react'

export const Spinner = ({ size = 'small' }) => {
    switch (size) {
        case 'small':
            return <CircularLoader small />
        case 'medium':
            return <CircularLoader />
        case 'large':
            return <CircularLoader large />
    }
    return null
}

Spinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
}
