import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import AppContainer from 'components/app/AppContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../style/layout/layout.scss';

const App = () => (
    <AppContainer store={store}/>
);
const render = () => {
    ReactDOM.render(<App />,
        document.getElementById('app_container'));
};

render();
