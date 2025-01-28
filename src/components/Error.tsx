import { Card, Center, NoticeBox } from '@dhis2/ui'
import React from 'react'
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import i18n from '../locales'

interface Error {
    status?: number
    statusText?: string
    internal?: boolean
    data?: string
    message?: string
}

type PassedErrorProps = {
    err?: {
        httpStatus?: string
        httpStatusCode?: number
        status?: string
        message?: string
        errorCode?: string
    }
}

export default function Error({ err }: PassedErrorProps) {
    const error: Error = useRouteError()

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
                <Center>
                    <NoticeBox title={i18n.t('An error occurred')} error>
                        {isRouteErrorResponse(error) ? (
                            <>
                                <p>
                                    <b>
                                        {error.status} {error.statusText}{' '}
                                    </b>
                                    <span>- {error.data}</span>
                                </p>
                                <Link to={'/dataStore'}>Back to datastore</Link>
                            </>
                        ) : (
                            <p>
                                <b>
                                    {error.status} {error.statusText}{' '}
                                </b>
                                {error?.message && (
                                    <span>- {error.message}</span>
                                )}
                            </p>
                        )}
                        {err && (
                            <p>
                                <b>
                                    {err.httpStatusCode} {err.httpStatus}{' '}
                                </b>
                                {err?.message && <span>- {err.message}</span>}
                            </p>
                        )}
                    </NoticeBox>
                </Center>
            </Card>
        </div>
    )
}
