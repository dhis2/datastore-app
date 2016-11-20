import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Layout from './Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
class AppContainer extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  shouldComponentUpdate () {
    return false
  }

  render() {

    const { store } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store = { store }>
        <Router history={ hashHistory }>
          <Route path={ "/" } component={ Layout } >
            <IndexRoute component={ HomePage } />
            <Route path={ "/home" } component={ HomePage } />
            <Route path={ "/about" } component={ AboutPage } />
          </Route>

        </Router>
      </Provider>
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
