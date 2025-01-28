import { CssReset, CssVariables } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

function AppWrapper({ children }) {
    return (
        <>
            <CssReset />
            <CssVariables theme spacers colors />
            {children}
        </>
    )
}

AppWrapper.propTypes = {
    children: PropTypes.node,
}

export default AppWrapper
