import { InputField } from '@dhis2/ui'
import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'

interface SearchFieldProps {
    placeholder?: string
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchField = ({
    placeholder,
    searchTerm,
    setSearchTerm,
}: SearchFieldProps) => {
    return (
        <div className={classes.search}>
            <InputField
                dense
                name="search"
                placeholder={placeholder || i18n.t('Search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.value)}
                clearable
                dataTest="search-field"
            />
        </div>
    )
}

export default SearchField
