import { InputField } from '@dhis2/ui'
import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'

const SearchField = () => {
    return (
        <div className={classes.bottom}>
            <InputField
                label={i18n.t('Search')}
                name="search-namespace"
                placeholder={i18n.t('Namespace')}
            />
        </div>
    )
}

export default SearchField
