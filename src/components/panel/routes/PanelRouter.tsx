import React from 'react'
import { Navigate, createHashRouter } from 'react-router-dom'
import PanelEdit from '../EditPanel'
import PanelEmptyArea from '../empty/EmptyArea'
import EmptyPanelEditor from '../empty/EmptyEditor'
import PanelError from '../error/ErrorComponent'
import PanelErrorPage from '../error/ErrorPanel'
import Main from './Main'
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
