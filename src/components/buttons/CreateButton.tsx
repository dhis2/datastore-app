import { Button } from '@dhis2/ui'
import React from 'react'
import classes from '../../App.module.css'

type CreateButtonProps = {
    label: string
    handleClick: () => void
    icon: React.ReactElement
    className?: string
}

const CreateButton = ({
    label,
    handleClick,
    icon,
    className,
}: CreateButtonProps) => {
    return (
        <div className={className}>
            <Button
                small
                aria-label={label}
                icon={icon}
                name="create"
                onClick={handleClick}
                title={label}
                className={classes.createButton}
                dataTest="create-button"
            >
                {label}
            </Button>
        </div>
    )
}

export default CreateButton
