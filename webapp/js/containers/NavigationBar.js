import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
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
                <Link to="/">
                <img src="../../img/logo_front.png" style={{
                    height: '20px',
                }} alt="dhis2"
                /></Link>
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
