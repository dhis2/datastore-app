import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';


import Home from './containers/Home';
import About from './containers/About';
import Layout from './containers/Layout';

import store from './utils/Store';

render (
  <Provider store = { store }>
    <Router history={ hashHistory }>

      <Route path={ "/" } component={ Layout } >
        <IndexRoute component={ Home } />
        <Route path={ "/home" } component={ Home } />
        <Route path={ "/about" } component={ About } />
      </Route>

    </Router>
  </Provider>,
  document.getElementById('app_container')
);
