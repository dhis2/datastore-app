import React from 'react'
import CreateAction from '../components/actions/CreateAction'
import Header from '../components/Header'
import SearchField from '../components/SearchField'
import ItemsTable from '../components/Table'
import i18n from '../locales'
import classes from '../Page.module.css'

const KeysPage = () => {
    const data = {
        results: ['cinnamon', 'latte', 'cafe', 'mocha'],
    }
    return (
        <>
            <Header />
            <div className={classes.midSection}>
                <SearchField
                    placeholder={i18n.t('Search keys in this namespace')}
                />
                <CreateAction type={'key'} />
            </div>
            <div>
                <ItemsTable data={data} label={i18n.t('Key name')} />
            </div>
        </>
    )
}

export default KeysPage
