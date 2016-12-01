import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/* Material UI Imports */
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import { updateValue } from '../../../actions/actions';

import WindowToolbarTitle from '../WindowToolbarTitle';

export class EditToolbar extends React.Component {

    handleSave() {
        const { namespace, selectedKey, editedValue, updateValue } = this.props;
        if (editedValue) {
            updateValue(namespace, selectedKey, editedValue);
        }
    }

    render() {
        const { path } = this.props;
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>

                    <ToolbarGroup>
                        <IconButton style={{ width: 'auto', padding: 0 }} onTouchTap={this.handleSave.bind(this)}>
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
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
    updateValue: PropTypes.func,
    path: PropTypes.string,
};

const mapStateToProps = (state) => ({
    editedValue: state.ui.editedValue,
    selectedKey: state.ui.key,
    namespace: state.ui.namespace,
});

const mapDispatchToProps = (dispatch) => ({
    updateValue(namespace, key, value) {
        dispatch(updateValue(namespace, key, value));
    },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditToolbar);
