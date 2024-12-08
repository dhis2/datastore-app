import React from 'react'
import i18n from '../../../locales'
import CreateButton from '../buttons/CreateButton'
import Header from '../Header'
import classes from '../Page.module.css'
import SearchField from '../SearchField'
import ItemsTable from '../Table'

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
                <div></div>
                <CreateButton
                    label={i18n.t('New Key')}
                    handleClick={() => console.log('create new key')}
                />
            </div>
            <div>
                <ItemsTable data={data} label={i18n.t('Key name')} />
            </div>
        </>
    )
}

export default KeysPage
