import React, { PropTypes, Component } from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

class NavigationBar extends Component {
    render() {
        const toolBarStyle = {
            backgroundColor: this.props.theme.primary1Color,
            color: this.props.theme.alternateTextColor,
            alignItems: 'center',
        };
        return (
            <Toolbar style={toolBarStyle}>
                <img src="../../img/logo_front.png" style={{
                    height: '20px',
                }} alt="dhis2"
                />
              <ToolbarTitle text="dhis2 Datastore" />
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
