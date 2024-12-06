import { NoticeBox } from '@dhis2/ui'
import React from 'react'
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import i18n from '../../../locales'
import classes from '../Panel.module.css'
import { PanelHeader } from '../PanelHeader'

interface Error {
    status?: number
    statusText?: string
    internal?: boolean
    data?: string
    message?: string
}

export type ErrorResponse = {
    httpStatus?: string
    httpStatusCode?: number
    status?: string
    message?: string
    errorCode?: string
}

type PassedErrorProps = {
    err?: ErrorResponse
}

export default function ErrorComponent({ err }: PassedErrorProps) {
    const error: Error = useRouteError()

    return (
        <div id="error-page" className={classes.sidebar}>
            <PanelHeader>
                <span>{''}</span>
            </PanelHeader>
            <div className={classes.sidebarContent}>
                <NoticeBox title={i18n.t('An error occurred')} error>
                    {isRouteErrorResponse(error) ? (
                        <>
                            <p>
                                <b>
                                    {error.status} {error.statusText}{' '}
                                </b>
                                <span>- {error.data}</span>
                            </p>
                        </>
                    ) : (
                        <p>
                            <b>
                                {error.status} {error.statusText}{' '}
                            </b>
                            {error?.message && <span>- {error.message}</span>}
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
                    <Link to={'/dataStore'}>Back to datastore</Link>
                </NoticeBox>
            </div>
        </div>
    )
}
