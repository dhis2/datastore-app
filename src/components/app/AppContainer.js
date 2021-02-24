import { PropTypes } from '@dhis2/prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Theme from '../../utils/theme'
import EditDisplay from '../display/edit/EditDisplay'
import EmptyDisplay from '../display/empty/EmptyDisplay'
import HistoryDisplay from '../display/history/HistoryDisplay'
import StatisticsDisplay from '../display/statistics/StatisticsDisplay'
import Layout from './Layout'

class AppContainer extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        const { store } = this.props

        return (
            <MuiThemeProvider muiTheme={Theme}>
                <Provider store={store}>
                    <Router history={hashHistory}>
                        <Route path={'/'} component={Layout}>
                            <IndexRoute component={EmptyDisplay} />
                            <Route
                                path={'edit/:namespace/:key'}
                                component={EditDisplay}
                            />
                            <Route
                                path={'history/:namespace'}
                                component={HistoryDisplay}
                            />
                            <Route
                                path={'history/:namespace/:key'}
                                component={HistoryDisplay}
                            />
                            <Route
                                path={'stats/:namespace'}
                                component={StatisticsDisplay}
                            />
                            <Route
                                path={'stats/:namespace/:key'}
                                component={StatisticsDisplay}
                            />
                        </Route>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}

AppContainer.propTypes = {
    store: PropTypes.object.isRequired,
}

export default AppContainer
