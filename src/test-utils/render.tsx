import { CustomDataProvider, Provider } from '@dhis2/app-runtime'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React, { ReactElement } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const customRender = (ui: ReactElement) => {
    return {
        user: userEvent.setup(),
        ...render(ui, {}),
    }
}

export const renderComponentWithRouter = (
    ui?: ReactElement,
    { customData = {}, routePath = '/', initialEntries = '/' } = {}
) => {
    return {
        user: userEvent.setup(),
        ...render(
            <Provider
                config={{ baseUrl: 'http://dhis2-test-server', apiVersion: 42 }}
                plugin={false}
                parentAlertsAdd={() => undefined}
                showAlertsInPlugin={true}
            >
                <CustomDataProvider
                    data={customData}
                    options={{ failOnMiss: true }}
                >
                    <MemoryRouter
                        initialEntries={[initialEntries]}
                        future={{
                            v7_startTransition: true,
                            v7_relativeSplatPath: true,
                        }}
                    >
                        <Routes>
                            <Route path={routePath} element={ui} />
                        </Routes>
                    </MemoryRouter>
                </CustomDataProvider>
            </Provider>
        ),
    }
}

export { customRender as render }
