import { PropTypes } from '@dhis2/prop-types'
import IconButton from 'material-ui/IconButton'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../sidebar/Sidebar.module.css'
import { Spinner } from '../utils/Loaders.js'

const containerStyle = {
    alignItems: 'center',
    justifyContent: 'center',
}

const SidebarAreaHOC = (Area, errorRefresh) => {
    class SidebarAreaBase extends Component {
        renderLoading = () => {
            return (
                <div className={styles.sidebarList} style={containerStyle}>
                    <Spinner size="medium" />
                </div>
            )
        }

        renderError = () => {
            return (
                <div className={styles.sidebarList} style={containerStyle}>
                    <IconButton onClick={errorRefresh}>
                        <NavigationRefresh />
                    </IconButton>
                    <p>Try again</p>
                </div>
            )
        }

        render() {
            const { loading, error, items } = this.props

            if (loading || items.length === 0) {
                return this.renderLoading()
            }

            if (error) {
                return this.renderError()
            }

            return <Area {...this.props} {...this.state} />
        }
    }

    SidebarAreaBase.propTypes = {
        error: PropTypes.bool,
        errorRefresh: PropTypes.func,
        items: PropTypes.object,
        loading: PropTypes.bool,
    }

    const mapStateToProps = (state) => ({
        loading: state.sidebar.fetching,
        error: state.sidebar.error,
    })

    return connect(mapStateToProps)(SidebarAreaBase)
}

export default SidebarAreaHOC
