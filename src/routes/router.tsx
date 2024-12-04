import React from 'react'
import { createHashRouter } from 'react-router-dom'
import Edit from '../components/edit/Edit'
import Keys from '../components/keys/Keys'
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
                        element: <Keys />,
                    },
                    {
                        path: ':namespace/edit/:key',
                        element: <Edit />,
                    },
                ],
            },
        ],
    },
])
