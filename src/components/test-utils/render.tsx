import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import React, { ReactElement } from 'react'
import { CustomDataProvider, Provider } from '@dhis2/app-runtime'

const customRender = (ui: ReactElement) => {
    return {
        user: userEvent.setup(),
        ...render(ui, { wrapper: MemoryRouter }),
    }
}

export const renderComponentWithRouter = (
    ui: ReactElement,
    {
      initialRoute = '/',
      customData = {},
    } = {}
  ) => {
    return {
      user: userEvent.setup(),
      ...render(
        <Provider
          config={{ baseUrl: 'http://dhis2-test-server', apiVersion: 41 }}
          plugin={false}
          parentAlertsAdd={() => undefined}
          showAlertsInPlugin={true}
        >
          <CustomDataProvider data={customData} options={{ failOnMiss: true }}>
            <MemoryRouter initialEntries={[initialRoute]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              {ui}
            </MemoryRouter>
          </CustomDataProvider>
        </Provider>
      ),
    };
  };

export { customRender as render }
