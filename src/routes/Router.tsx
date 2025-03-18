import React from 'react'
import { Navigate, createHashRouter } from 'react-router-dom'
import ErrorComponent from '../components/error/ErrorComponent'
import EditPage from '../components/pages/Edit'
import NamespacesPage from '../components/pages/Namespaces'
import EditorPanel from '../components/panels/EditorPanel'
import EmptyEditorPanel from '../components/panels/EmptyEditorPanel'
import PageLayout from './PageLayout'

export const hashRouter = createHashRouter([
    {
        path: '/',
        element: <PageLayout />,
        errorElement: <ErrorComponent />,
        children: [
            { index: true, element: <Navigate to={'dataStore'} replace /> },
            {
                path: ':store',
                element: <NamespacesPage />,
            },
            {
                path: ':store/edit/:namespace',
                element: <EditPage />,
                children: [
                    {
                        index: true,
                        element: <EmptyEditorPanel />,
                    },
                    {
                        path: ':key',
                        element: <EditorPanel />,
                    },
                ],
            },
        ],
    },
])
