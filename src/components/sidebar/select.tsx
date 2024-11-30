import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'

const SelectDataStore = ({ option, handleChange }) => {
    return (
        <div className={classes.bottom}>
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

SelectDataStore.propTypes = {
    handleChange: PropTypes.func,
    option: PropTypes.string,
}

export default SelectDataStore
