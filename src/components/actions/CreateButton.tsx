import { Button, colors } from '@dhis2/ui'
import { IconAdd24 } from '@dhis2/ui-icons'
import React from 'react'
import classes from '../../Page.module.css'

type CreateButtonProps = {
    label: string
    handleClick: () => void
}

const CreateButton = ({ label, handleClick }: CreateButtonProps) => {
    return (
        <div className={classes.createButton}>
            <Button
                aria-label={label}
                icon={<IconAdd24 color={colors.grey600} />}
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
