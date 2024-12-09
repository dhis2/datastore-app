import React from 'react'
import i18n from '../../../locales'
import CreateAction from '../CreateAction'
import Header from '../Header'
import classes from '../Page.module.css'
import SearchField from '../SearchField'
import ItemsTable from '../table/Table'

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
