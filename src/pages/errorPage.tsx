import { Center } from '@dhis2/ui'
import React from 'react'
import { useRouteError } from 'react-router-dom'

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
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </Center>
        </div>
    )
}
