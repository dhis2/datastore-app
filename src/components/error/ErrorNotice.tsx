import { NoticeBox } from '@dhis2/ui'
import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'

interface ErrorNoticeProps {
    error?: string
}

const ErrorNotice = ({ error }: ErrorNoticeProps) => {
    console.error(error)
    return (
        <div className={classes.errorNotice}>
            <NoticeBox warning>
                <p>{i18n.t('An error has occurred. Try again')}</p>
            </NoticeBox>
        </div>
    )
}

export default ErrorNotice
