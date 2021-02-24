import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import React, { Component } from 'react'

class EmptyToolbar extends Component {
    render() {
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar></Toolbar>
            </Paper>
        )
    }
}

export default EmptyToolbar
