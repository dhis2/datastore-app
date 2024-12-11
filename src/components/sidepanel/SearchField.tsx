import { InputField } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import classes from '../Panel.module.css'

const PanelSearchField = () => {
    return (
        <div className={classes.bottom}>
            <InputField name="search" placeholder={i18n.t('Search')} />
        </div>
    )
}

export default PanelSearchField
