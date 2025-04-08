import { CircularLoader } from '@dhis2/ui'
import React from 'react'
import classes from '../../App.module.css'

const CenteredLoader = () => {
    return (
        <div className={classes.centeredLoader} data-test="centered-loader">
            <CircularLoader />
        </div>
    )
}

export default CenteredLoader
