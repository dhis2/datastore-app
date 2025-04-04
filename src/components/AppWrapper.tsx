import { CssReset, CssVariables } from '@dhis2/ui'
import React from 'react'

function AppWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CssReset />
            <CssVariables theme spacers colors />
            {children}
        </>
    )
}

export default AppWrapper
