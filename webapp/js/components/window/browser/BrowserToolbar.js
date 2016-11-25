import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar } from 'material-ui/Toolbar';
import WindowToolbarTitle from '../WindowToolbarTitle';

class BrowserToolbar extends Component {
    render() {
        const { namespace, key, updateValue } = this.props;
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                    <WindowToolbarTitle path={`${namespace}/${key}`} />
                </Toolbar>
            </Paper>
        );
    }
}


export default BrowserToolbar;
