import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

class EmptyToolbar extends Component {
    render() {
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                  <ToolbarTitle text={'Value'} />
                </Toolbar>
            </Paper>
        );
    }
}

export default EmptyToolbar;
