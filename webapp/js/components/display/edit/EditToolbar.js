import React, { PropTypes } from 'react';
import DisplayToolbarTitle from 'components/display/DisplayToolbarTitle';
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
                        <IconButton onTouchTap={this.props.handleSave}>
                            <ContentSave />
                        </IconButton>
                        <ToolbarSeparator />
                        <DisplayToolbarTitle path={ path } />
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
