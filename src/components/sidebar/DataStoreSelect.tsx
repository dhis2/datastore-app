import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
// import classes from '../../App.module.css'
import i18n from '../../locales'

const DataStoreSelect = ({ option, handleChange }) => {
    return (
        <div>
            <SingleSelectField
                label="Select Datastore"
                selected={option}
                onChange={handleChange}
            >
                <SingleSelectOption
                    label={i18n.t('DataStore')}
                    value={'dataStore'}
                />
                <SingleSelectOption
                    label={i18n.t('User DataStore')}
                    value={'userDataStore'}
                />
            </SingleSelectField>
        </div>
    )
}

DataStoreSelect.propTypes = {
    handleChange: PropTypes.func,
    option: PropTypes.string,
}

export default DataStoreSelect
