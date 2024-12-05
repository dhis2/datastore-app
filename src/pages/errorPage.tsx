import { Button, Card, NoticeBox } from '@dhis2/ui'
import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
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
    const navigate = useNavigate()

    return (
        <div
            id="error-page"
            className=""
            style={{
                height: '100vh',
                padding: '1em',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Card>
                <NoticeBox title={i18n.t('An error has occurred')} error>
                    {/* <p><i>{error.statusText || error.message}</i></p> */}
                    {error.data && <p>{error.data}</p>}
                </NoticeBox>
                <Button
                    aria-label={i18n.t('Back')}
                    name="Back"
                    onClick={() => {
                        navigate('dataStore')
                    }}
                    title={i18n.t('Back')}
                >
                    {i18n.t('Back to DataStore')}
                </Button>
            </Card>
        </div>
    )
}
