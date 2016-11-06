import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Layout from './Layout';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

import '../../style/main.scss';

class AppContainer extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render() {

    const { store } = this.props;

    return (
      <Provider store = { store }>
        <Router history={ hashHistory }>
          <Route path={ "/" } component={ Layout } >
            <IndexRoute component={ HomePage } />
            <Route path={ "/home" } component={ HomePage } />
            <Route path={ "/about" } component={ AboutPage } />
          </Route>

        </Router>
      </Provider>
    );
  }
}

export default AppContainer;
