import { NoticeBox } from '@dhis2/ui'
import React from 'react'
import { Link } from 'react-router-dom'
import i18n from '../../locales'
import classes from '../../Page.module.css'
import CreateAction from '../actions/CreateAction'
import CenteredLoader from '../CenteredLoader'
import SearchField from '../SearchField'
import ItemsTable from '../Table'

type MainSectionProps = {
    data: { results: string[] }
    type: string
    loading: boolean
    error: object
}

const MainSection = ({ error, data, loading, type }: MainSectionProps) => {
    const placeholder =
        type === 'namespace'
            ? i18n.t('Search namespaces')
            : i18n.t('Search keys in this namespace')
    const tableLabel =
        type === 'namespace' ? i18n.t('Namespace') : i18n.t('Key Name')

    if (error) {
        return (
            <div
                style={{
                    width: '100%',
                    padding: '2em',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <NoticeBox warning>
                    <p>{i18n.t('An error has occurred')}</p>
                    <Link to={'/dataStore'}>{i18n.t('Back to datastore')}</Link>
                </NoticeBox>
            </div>
        )
    }
    if (loading) {
        return <CenteredLoader />
    }

    return (
        <>
            <div className={classes.midSection}>
                <SearchField placeholder={placeholder} />
                <CreateAction type={type} />
            </div>
            <div>
                <ItemsTable data={data} label={tableLabel} />
            </div>
        </>
    )
}

export default MainSection
