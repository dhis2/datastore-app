import React from 'react'
import { Navigate, createHashRouter } from 'react-router-dom'
import Edit from '../components/edit/Edit'
import EmptyArea from '../components/EmptyArea'
import Error from '../components/Error'
import Keys from '../components/keys/Keys'
import Layout from './layout'

export const router = createHashRouter([
    {
        path: '/',
        errorElement: <Error />,
        element: <Layout />,
        children: [
            { index: true, element: <Navigate to={'dataStore'} replace /> },
            {
                path: ':store',
                children: [
                    {
                        errorElement: <Error />,
                        children: [
                            {
                                index: true,
                                element: <EmptyArea />,
                            },
                            {
                                path: 'edit/:namespace',
                                element: <Keys />,
                            },
                            {
                                path: 'edit/:namespace/:key',
                                element: <Edit />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
])
