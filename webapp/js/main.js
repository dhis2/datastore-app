import React from 'react'
import ReactDOM from 'react-dom'

import store from './store/Store'
import AppContainer from './containers/AppContainer'


const render = () =>  {
  ReactDOM.render(<AppContainer store={ store } />,
    document.getElementById('app_container'))
}

render()
