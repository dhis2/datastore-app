import React, { FC } from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import AppWrapper from './components/appWrapper'
import { DataStoreList, UserDataStoreList } from './components/list'
import ErrorPage from './pages/errorPage'
import Layout from './routes/layout'

export const router = createHashRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: <Layout />,
        children: [
            {
                path: 'dataStore',
                element: <DataStoreList />,
            },
            {
                path: 'userDataStore',
                element: <UserDataStoreList />,
            },
        ],
    },
])

const App: FC = () => {
    return (
        <AppWrapper>
            <RouterProvider router={router} />
        </AppWrapper>
    )
}

export default App
