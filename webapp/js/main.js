import React from 'react'
import ReactDOM from 'react-dom'

import store from './store/Store'
import AppContainer from './containers/AppContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../style/layout/layout.scss';


const App = () => (
    <MuiThemeProvider>
      <AppContainer store={store} />
    </MuiThemeProvider>
);
const render = () =>  {
  ReactDOM.render(<App />,
    document.getElementById('app_container'))
}

render()
