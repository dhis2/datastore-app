import { NoticeBox, Center } from '@dhis2/ui'
import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'

const ErrorComponent = () => {
    return (
        <div className={classes.errorComponent}>
            <Center>
                <NoticeBox warning title={i18n.t('An error has occurred')}>
                    <p>{i18n.t('404 Page Not Found')}</p>
                    <Link to={'/dataStore'}>{i18n.t('Back to datastore')}</Link>
                </NoticeBox>
            </Center>
        </div>
    )
}

export default ErrorComponent
