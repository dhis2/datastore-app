import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateValue } from '../../../actions/actions';
import WindowToolbarTitle from '../WindowToolbarTitle';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

export class EditToolbar extends React.Component {

    render() {
        const { path } = this.props;
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                    <ToolbarGroup>
                        <IconButton style={{ width: 'auto', padding: 0 }} onTouchTap={this.props.handleSave}>
                            <ContentSave />
                        </IconButton>
                        <ToolbarSeparator />
                        <WindowToolbarTitle path={ path } />
                    </ToolbarGroup>
                </Toolbar>
            </Paper>
        );
    }
}

EditToolbar.propTypes = {
    handleSave: PropTypes.func,
    path: PropTypes.string,
};

export default EditToolbar;
