import React from 'react'
import { Navigate, createHashRouter } from 'react-router-dom'
import PanelEmptyArea from '../components/empty/EmptyArea'
import EmptyPanelEditor from '../components/empty/EmptyEditor'
import PanelError from '../components/error/ErrorComponent'
import PanelErrorPage from '../components/error/ErrorPanel'
import EditPanel from '../components/panels/EditPanel'
import Main from './MainLayout'
import ThreePanelLayout from './ThreePanelLayout'

export const threePanelRouter = createHashRouter([
    {
        path: '/',
        errorElement: <PanelError />,
        element: <ThreePanelLayout />,
        children: [
            { index: true, element: <Navigate to={'dataStore'} replace /> },
            {
                path: ':store',
                children: [
                    {
                        errorElement: <PanelErrorPage />,
                        children: [
                            {
                                index: true,
                                element: <PanelEmptyArea />,
                            },
                            {
                                path: 'edit/:namespace',
                                element: <Main />,
                                children: [
                                    {
                                        index: true,
                                        element: <EmptyPanelEditor />,
                                    },
                                    {
                                        path: ':key',
                                        element: <EditPanel />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
])
