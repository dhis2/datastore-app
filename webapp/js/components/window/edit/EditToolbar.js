import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/* Material UI Imports */
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import { updateValue } from '../../../actions/actions';

import WindowToolbarTitle from '../WindowToolbarTitle';

class EditToolbar extends React.Component {

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
                    <WindowToolbarTitle path={ path } />
                    <ToolbarGroup>
                        <IconButton onTouchTap={this.handleSave.bind(this)}>
                            <ContentSave />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
            </Paper>
        );
    }
}

EditToolbar.propTypes = {
    editedValue: PropTypes.string,
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
