import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Layout from './Layout';
import Home from './Home';
import About from './About';
import Folder from './Folder';
import KeyFolder from './KeyFolder';
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
            <IndexRoute component={ Home } />
            <Route path={ "/home" } component={ Home } />
            <Route path={ "/browse"} component = {Folder} />
              <Route path={"/browse/:namespace"} component = {KeyFolder} />

            <Route path={ "/about" } component={ About } />
            </Route>

        </Router>
      </Provider>
    );
  }
}

export default AppContainer;
