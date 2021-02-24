import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import React, { PropTypes, Component } from 'react'
import Searchbar from './Searchbar'

class SidebarHeader extends Component {
    render() {
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                    <Searchbar />
                    <ToolbarGroup lastChild>{this.props.children}</ToolbarGroup>
                </Toolbar>
            </Paper>
        )
    }
}

SidebarHeader.propTypes = {
    children: PropTypes.element,
}

export default SidebarHeader
