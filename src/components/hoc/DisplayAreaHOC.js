import { PropTypes } from '@dhis2/prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ErrorArea from '../display/ErrorArea'
import LoadingArea from '../display/LoadingArea'

const DisplayAreaHOC = Area => {
    class DisplayAreaBase extends Component {
        constructor(props) {
            super(props)
        }

        renderLoading = () => {
            return <LoadingArea />
        }

        renderError = () => {
            return <ErrorArea error={this.props.errorMessage} />
        }

        render() {
            const { loading, error, ...props } = this.props

            if (loading) {
                return this.renderLoading()
            }

            if (error) {
                return this.renderError()
            }

            return <Area {...props} {...this.state} />
        }
    }

    DisplayAreaBase.propTypes = {
        error: PropTypes.bool,
        errorMessage: PropTypes.object,
        loading: PropTypes.bool,
    }

    const mapStateToProps = state => ({
        loading: state.display.fetching,
        error: state.display.error,
        errorMessage: state.display.errorMessage,
    })

    return connect(mapStateToProps)(DisplayAreaBase)
}

export default DisplayAreaHOC
