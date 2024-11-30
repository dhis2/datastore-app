import React from 'react'
import { createHashRouter } from 'react-router-dom'
import KeysTable from '../components/keys/KeysTable'
import ErrorPage from '../pages/ErrorPage'
import Layout from './Layout'

export const router = createHashRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: <Layout />,
        children: [
            {
                path: ':store',
                children: [
                    {
                        path: ':namespace',
                        element: <KeysTable />,
                    },
                ],
            },
        ],
    },
])
