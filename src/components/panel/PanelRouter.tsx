import React from 'react'
import { Navigate, createHashRouter } from 'react-router-dom'
import EmptyPanelEditor from './EmptyPanelEditor'
import Main from './Main'
import PanelEdit from './PanelEdit'
import PanelEmptyArea from './PanelEmptyArea'
import PanelError from './PanelError'
import PanelErrorPage from './PanelErrorPage'
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
                                        element: <PanelEdit />,
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
