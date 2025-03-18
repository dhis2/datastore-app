import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import React, { ReactElement } from 'react'
import { CustomDataProvider, Provider } from '@dhis2/app-runtime'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

const customRender = (ui: ReactElement) => {
    return {
        user: userEvent.setup(),
        ...render(ui, { wrapper: MemoryRouter }),
    }
}

const queryClientOptions = {
    defaultOptions: {
        queries: {
            // Disable automatic error retries
            retry: false,
            // Retry on mount if query has errored
            retryOnMount: true,
            // Refetch on mount if data is stale
            refetchOnMount: true,
            // Don't refetch when the window regains focus
            refetchOnWindowFocus: false,
            // Don't refetch after connection issues
            refetchOnReconnect: false,
        },
    },
}


export const RenderWrapper = ({ children }) => (
    <MemoryRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Provider
            config={{ baseUrl: '', apiVersion: 42 }}
            plugin={false}
            parentAlertsAdd={() => undefined}
            showAlertsInPlugin={true}
        >
            <CustomDataProvider data={{}}
                options={{ failOnMiss: true }}>
                {children}
            </CustomDataProvider>
        </Provider>
        </QueryParamProvider>
    </MemoryRouter>
)

export { customRender as render }
