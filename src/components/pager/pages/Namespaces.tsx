import React from 'react'
import i18n from '../../../locales'
import CreateButton from '../buttons/CreateButton'
import Header from '../Header'
import classes from '../Page.module.css'
import SearchField from '../SearchField'
import ItemsTable from '../Table'

const NamespacesPage = () => {
    const data = {
        results: ['tea', 'coffee', 'chocolate', 'rose'],
    }
    return (
        <>
            <Header>
                <span>Namespaces - Tabs go here</span>
            </Header>
            <div className={classes.midSection}>
                <SearchField placeholder={i18n.t('Search namespaces')} />
                <CreateButton
                    label={i18n.t('New Namespace')}
                    handleClick={() => console.log('create new namespace')}
                />
            </div>
            <div>
                <ItemsTable data={data} label={i18n.t('Namespace')} />
            </div>
        </>
    )
}

export default NamespacesPage
