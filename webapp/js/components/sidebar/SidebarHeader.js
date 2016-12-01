import React, { PropTypes, Component } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Searchbar from './Searchbar';

const paperStyle = {
    zIndex: 5,
};

class SidebarHeader extends Component {
    render() {
        return (
            <Paper style={ paperStyle }>
                <Toolbar>
                    <Searchbar />
                    <ToolbarGroup lastChild>
                          { this.props.children }
                    </ToolbarGroup>
                </Toolbar>
            </Paper>
        );
    }
}

SidebarHeader.propTypes = {
    children: PropTypes.element,
};

export default SidebarHeader;
