import { CircularLoader } from '@dhis2/ui'
import React from 'react'

const CenteredLoader = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <CircularLoader />
        </div>
    )
}

export default CenteredLoader
