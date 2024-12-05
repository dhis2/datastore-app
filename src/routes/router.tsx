import React from 'react'
import { Navigate, createHashRouter } from 'react-router-dom'
import Edit from '../components/edit/Edit'
import EmptyArea from '../components/EmptyArea'
import Keys from '../components/keys/Keys'
import ErrorPage from '../pages/ErrorPage'
import Layout from './Layout'

export const router = createHashRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: <Layout />,
        children: [
            { index: true, element: <Navigate to={'dataStore'} replace /> },
            {
                path: ':store',
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
])
