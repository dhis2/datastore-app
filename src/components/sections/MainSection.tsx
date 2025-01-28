import { NoticeBox } from '@dhis2/ui'
import React from 'react'
import { Link } from 'react-router-dom'
import i18n from '../../locales'
import classes from '../../Page.module.css'
import CreateAction from '../actions/CreateAction'
import CenteredLoader from '../CenteredLoader'
import SearchField from '../SearchField'
import ItemsTable from '../Table'
import { FieldValues } from './NamespaceSections'

type MainSectionProps = {
    data: { results: string[] }
    sectionType: string
    loading: boolean
    error: object
    handleCreate?: () => void
    values: FieldValues
    setValues: React.Dispatch<React.SetStateAction<FieldValues>>
    handleRefetch: () => void
}

const MainSection = ({
    error,
    data,
    loading,
    sectionType: type,
    handleCreate,
    values,
    setValues,
    handleRefetch,
}: MainSectionProps) => {
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
                <SearchField
                    placeholder={
                        type === 'namespace'
                            ? i18n.t('Search namespaces')
                            : i18n.t('Search keys in this namespace')
                    }
                />
                <CreateAction
                    values={values}
                    setValues={setValues}
                    type={type}
                    handleCreate={handleCreate}
                />
            </div>
            <div>
                {data && (
                    <ItemsTable
                        data={data}
                        label={
                            type === 'namespace'
                                ? i18n.t('Namespace')
                                : i18n.t('Key Name')
                        }
                        refetchList={handleRefetch}
                    />
                )}
            </div>
        </>
    )
}

export default MainSection
