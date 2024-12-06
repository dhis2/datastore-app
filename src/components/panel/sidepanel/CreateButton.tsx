import { Button } from '@dhis2/ui'
import { IconAdd16 } from '@dhis2/ui-icons'
import React from 'react'
import i18n from '../../../locales'
import classes from '../Panel.module.css'

const CreateButton = ({ label, handleClick }) => {
    return (
        <div className={classes.createButton}>
            <Button
                aria-label={label}
                icon={<IconAdd16 />}
                name="create"
                onClick={handleClick}
                title={label}
            >
                {label}
            </Button>
        </div>
    )
}

export default CreateButton
