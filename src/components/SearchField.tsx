import { InputField } from '@dhis2/ui'
import React from 'react'
import i18n from '../locales'
import classes from '../Page.module.css'

const SearchField = ({ placeholder }: { placeholder?: string }) => {
    return (
        <div className={classes.search}>
            <InputField
                name="search"
                placeholder={placeholder || i18n.t('Search')}
            />
        </div>
    )
}

export default SearchField
