import { Button } from '@dhis2/ui'
import { IconAdd16 } from '@dhis2/ui-icons'
import React from 'react'
import { useSidePanelContext } from '../../context/SidePanelContext'
import i18n from '../../locales'
import classes from '../Panel.module.css'

type CreateButtonProps = {
    handleClick: () => void
}

const CreateButton = ({ handleClick }: CreateButtonProps) => {
    const { panelType: type } = useSidePanelContext()
    const label =
        type === 'namespace' ? i18n.t('New namespace') : i18n.t('New key')
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
