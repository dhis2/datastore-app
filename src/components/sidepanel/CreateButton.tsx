import { Button } from '@dhis2/ui'
import { IconAdd16 } from '@dhis2/ui-icons'
import React from 'react'
import i18n from '../../locales'
import classes from '../Panel.module.css'

type CreateButtonProps = {
    label: string
    handleClick: () => void
}

const CreateButton = ({ label, handleClick }: CreateButtonProps) => {
    return (
        <div className={classes.createButton}>
            <Button
                aria-label={label}
                icon={<IconAdd16 />}
                name={i18n.t('create')}
                onClick={handleClick}
                title={label}
            >
                {label}
            </Button>
        </div>
    )
}

export default CreateButton
