import React from 'react'
import { createHashRouter } from 'react-router-dom'
import KeysTable from '../components/keys/keysTable'
import ErrorPage from '../pages/errorPage'
import Layout from './layout'

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
