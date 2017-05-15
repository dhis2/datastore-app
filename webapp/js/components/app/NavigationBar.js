import React, {Component} from 'react';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import Theme from 'utils/theme';
import Api from '../../utils/api';

const imageStyle = {
    height: '20px',
};

const toolBarStyle = {
    alignItems: 'center',
    backgroundColor: Theme.palette.primary1Color,
    color: Theme.palette.alternateTextColor,
};

class NavigationBar extends Component {
    render() {
        return (
            <Toolbar style={ toolBarStyle }>
                <a href={Api.baseUrl}>
                    <img src="https://play.dhis2.org/test/api/staticContent/logo_banner" style={ imageStyle }
                         alt="dhis2"/>
                </a>
                <ToolbarTitle text="Datastore App"/>
            </Toolbar>
        );
    }
}

export default NavigationBar;
