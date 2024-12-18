import { InputField } from '@dhis2/ui'
import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'

const SearchField = ({ placeholder }: { placeholder?: string }) => {
    return (
        <div className={classes.search}>
            <InputField
                dense
                name="search"
                placeholder={placeholder || i18n.t('Search')}
            />
        </div>
    )
}

export default SearchField
