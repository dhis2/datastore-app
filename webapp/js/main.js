import React from 'react'
import ReactDOM from 'react-dom'

import store from './store/Store'
import AppContainer from './containers/AppContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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
