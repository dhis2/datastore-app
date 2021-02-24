import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import React, { Component } from 'react'
import { ErrorIconWithText } from '../utils/Icons'

class ErrorArea extends Component {
    render() {
        return (
            <ErrorIconWithText
                text={this.props.error || i18n.t('An error has occurred.')}
            />
        )
    }
}

ErrorArea.propTypes = {
    error: PropTypes.any,
}

export default ErrorArea
