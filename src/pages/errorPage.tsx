import { Center, NoticeBox } from '@dhis2/ui'
import React from 'react'
import { useRouteError } from 'react-router-dom'
import i18n from '../locales'

interface Error {
    status?: number
    statusText?: string
    internal?: boolean
    data?: string
    message?: string
}

export default function ErrorPage() {
    const error: Error = useRouteError()

    return (
        <div id="error-page">
            <Center>
                <NoticeBox title={i18n.t('An error has occurred')} error>
                    <p>
                        <i>{error.statusText || error.message}</i>
                    </p>
                </NoticeBox>
            </Center>
        </div>
    )
}
