import React from 'react'
import { Navigate, createHashRouter } from 'react-router-dom'
import EditPage from '../pages/Edit'
import KeysPage from '../pages/Keys'
import NamespacesPage from '../pages/Namespaces'
import PagerLayout from './PagerLayout'

export const pagerRouter = createHashRouter([
    {
        path: '/',
        element: <PagerLayout />,
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
