import { Button } from '@dhis2/ui'
import React from 'react'
import classes from '../../App.module.css'

type CreateButtonProps = {
    label: string
    handleClick: () => void
    icon: React.ReactElement
}

const CreateButton = ({ label, handleClick, icon }: CreateButtonProps) => {
    return (
        <div className={classes.createButton}>
            <Button
                aria-label={label}
                icon={icon}
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
