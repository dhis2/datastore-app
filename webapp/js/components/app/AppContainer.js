import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import Layout from './Layout';
import HistoryDisplay from 'components/display/history/HistoryDisplay';
import EmptyDisplay from 'components/display/empty/EmptyDisplay';
import EditDisplay from 'components/display/edit/EditDisplay';
import StatisticsDisplay from 'components/display/statistics/StatisticsDisplay';
import Theme from 'utils/theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../../../style/main.scss';

injectTapEventPlugin();

class AppContainer extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { store } = this.props;

        return (
          <MuiThemeProvider muiTheme={ Theme }>
              <Provider store = { store }>
                  <Router history={ hashHistory }>
                      <Route path={ '/' } component={ Layout }>
                          <IndexRoute component={ EmptyDisplay } />
                          <Route path={ 'edit/:namespace/:key' } component={ EditDisplay } />
                          <Route path={ 'history/:namespace' } component={ HistoryDisplay } />
                          <Route path={ 'history/:namespace/:key' } component={ HistoryDisplay } />
                          <Route path={ 'stats/:namespace' } component={ StatisticsDisplay } />
                          <Route path={ 'stats/:namespace/:key' } component={ StatisticsDisplay } />
                      </Route>
                  </Router>
              </Provider>
          </MuiThemeProvider>
        );
    }
}

AppContainer.propTypes = {
    store: PropTypes.object.isRequired,
};

export default AppContainer;
