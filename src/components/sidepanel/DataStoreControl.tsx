import { SegmentedControl } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'

type DataStoreControlProps = {
    option: string
    handleChange: (payload, event) => void
}

export default function DataStoreControl({
    option,
    handleChange,
}: DataStoreControlProps) {
    return (
        <SegmentedControl
            onChange={handleChange}
            options={[
                {
                    label: i18n.t('DataStore'),
                    value: 'dataStore',
                },
                {
                    label: i18n.t('UserDataStore'),
                    value: 'userDataStore',
                },
            ]}
            selected={option}
        />
    )
}
