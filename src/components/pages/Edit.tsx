import { IconArrowLeft16 } from '@dhis2/ui'
import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import PageHeader from '../header/PageHeader'
import KeysPanel from '../panels/KeysPanel'

const EditPage = () => {
    const { store } = useParams()

    return (
        <div className={classes.secondPage}>
            <PageHeader>
                <Link to={`/${store}`} className={classes.secondPageHeader}>
                    <span>
                        <IconArrowLeft16 /> {i18n.t('Back to all namespaces')}
                    </span>
                </Link>
            </PageHeader>
            <div className={classes.secondPageContainer}>
                <div className={classes.keysPanel}>
                    <KeysPanel />
                </div>
                <div className={classes.editorPanel}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default EditPage
