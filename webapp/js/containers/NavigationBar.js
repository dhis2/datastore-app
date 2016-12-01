import React, { PropTypes, Component } from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

const imageStyle = {
    height: '20px',
};

const toolBarStyle = {
    alignItems: 'center',
};

class NavigationBar extends Component {
    render() {
        toolBarStyle.backgroundColor = this.props.theme.primary1Color;
        toolBarStyle.color = this.props.theme.alternateTextColor;

        return (
            <Toolbar style={ toolBarStyle }>
                <img src="../../img/logo_front.png" style={ imageStyle } alt="dhis2" />
                <ToolbarTitle text="Datastore App" />
            </Toolbar>
        );
    }
}

NavigationBar.propTypes = {
    theme: PropTypes.shape({
        primary1Color: PropTypes.string,
        alternateTextColor: PropTypes.string,
    }),
};

export default NavigationBar;
