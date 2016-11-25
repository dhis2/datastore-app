import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Layout from './Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../../style/main.scss';
import {
    blue500, blue700,blue900,
    pinkA200,
    grey100,grey200, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

injectTapEventPlugin();


class AppContainer extends Component {

  static theme = getMuiTheme({
    palette: {
      primary1Color: blue700,
      primary2Color: blue900,
      primary3Color: grey200,
      accent1Color: pinkA200,
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: darkBlack,
      alternateTextColor: white,
      canvasColor: white,
      borderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: blue500,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
  });

  shouldComponentUpdate () {
    return false
  }


  render() {
    const { store } = this.props;

    return (
      <MuiThemeProvider muiTheme={AppContainer.theme}>
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

AppContainer.propTypes = {
  store: PropTypes.object.isRequired
};

export default AppContainer;
