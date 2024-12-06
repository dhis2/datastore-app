import { Button } from '@dhis2/ui'
import { IconAdd16 } from '@dhis2/ui-icons'
import React from 'react'
import i18n from '../../locales'
import classes from './Panel.module.css'

const CreateButton = () => {
    return (
        <div className={classes.createButton}>
            <Button
                aria-label={i18n.t('New')}
                icon={<IconAdd16 />}
                name="New button"
                onClick={() => {
                    console.log('Launch create modal')
                }}
                title={i18n.t('New')}
            >
                {i18n.t('New')}
            </Button>
        </div>
    )
}

export default CreateButton
