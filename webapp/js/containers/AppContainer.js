import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import Layout from './Layout';
import HistoryWindow from '../components/window/history/HistoryWindow';
import EmptyWindow from '../components/window/empty/EmptyWindow';
import EditWindow from '../components/window/edit/EditWindow';
import StatisticsWindow from '../components/window/statistics/StatisticsWindow';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../../style/main.scss';
import {
    blue500, blue700,blue900,
    pinkA200,
    grey100,grey200, grey300, grey500,
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
                  <Route path={ "/" } component={ Layout }>
                    <IndexRoute component={ EmptyWindow } />
                    <Route path={ "edit/:namespace/:key" } component={ EditWindow } />
                    <Route path={ "history/:namespace" } component={ HistoryWindow } />
                    <Route path={ "history/:namespace/:key" } component={ HistoryWindow } />
                    <Route path={ "stats/:namespace" } component={ StatisticsWindow } />
                    <Route path={ "stats/:namespace/:key" } component={ StatisticsWindow } />
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
