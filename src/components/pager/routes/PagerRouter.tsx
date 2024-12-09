import React from 'react'
import { Navigate, createHashRouter } from 'react-router-dom'
import EditPage from '../pages/Edit'
import ErrorComponent from '../pages/Error'
import KeysPage from '../pages/Keys'
import NamespacesPage from '../pages/Namespaces'
import PagerLayout from './PagerLayout'

export const pagerRouter = createHashRouter([
    {
        path: '/',
        element: <PagerLayout />,
        errorElement: <ErrorComponent />,
        children: [
            { index: true, element: <Navigate to={'dataStore'} replace /> },
            {
                path: ':store',
                element: <NamespacesPage />,
            },
            {
                path: ':store/edit/:namespace',
                element: <KeysPage />,
            },
            {
                path: ':store/edit/:namespace/:key',
                element: <EditPage />,
            },
        ],
    },
])
