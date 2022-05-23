import { PropTypes } from '@dhis2/prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider.js'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Theme from '../../utils/theme.js'
import EditDisplay from '../display/edit/EditDisplay.js'
import EmptyDisplay from '../display/empty/EmptyDisplay.js'
import Layout from './Layout.js'

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
