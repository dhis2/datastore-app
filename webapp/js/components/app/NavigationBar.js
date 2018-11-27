import React, {Component} from 'react';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import Theme from 'utils/theme';
import Api from '../../utils/api';

const toolBarStyle = {
    alignItems: 'center',
    backgroundColor: Theme.palette.primary1Color,
    color: Theme.palette.alternateTextColor,
    padding: '0 24px 0 0',
    height: '44px',
};

class NavigationBar extends Component {

    render() {
        return (
            <Toolbar style={ toolBarStyle }>
                <a href={Api.baseUrl}>
                    <img src={`${Api.baseUrl}/api/staticContent/logo_banner`}
                         alt="dhis2"
                    />
                </a>
                <ToolbarTitle text="Datastore Manager"/>
            </Toolbar>
        );
    }
}

export default NavigationBar;
