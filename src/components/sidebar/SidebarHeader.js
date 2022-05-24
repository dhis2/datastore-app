import { PropTypes } from '@dhis2/prop-types'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import React, { Component } from 'react'
import Searchbar from './Searchbar.js'

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
