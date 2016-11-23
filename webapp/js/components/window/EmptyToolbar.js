import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

/* Material UI Imports */
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';

class EmptyToolbar extends React.Component {
    render() {
        const {namespace, key, updateValue} = this.props;
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                  <ToolbarTitle text={"Value"} />
                </Toolbar>
            </Paper>
        );
    }
}

export default EmptyToolbar;
