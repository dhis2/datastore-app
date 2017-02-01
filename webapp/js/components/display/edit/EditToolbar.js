import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DisplayToolbarTitle from 'components/display/DisplayToolbarTitle';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import SaveIcon from 'material-ui/svg-icons/content/save';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import RedoIcon from 'material-ui/svg-icons/content/redo';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import JSONSearchBar from 'components/utils/JSONSearchBar';
import { searchJSON,
    jsonEditorCollapse,
    jsonEditorExpand,
    jsonEditorUndo,
    jsonEditorRedo,
    jsonEditorChangeMode
} from 'actions/actions';

const styles = {
    dropDownMenuIcon: {
        fill: 'black'
    },
    dropDownMenu: {
        marginBottom: '6px',
    },
    searchBar: {
        marginBottom: '25px'
    }
}

export class EditToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.handleDropDownMenuChange = this.handleDropDownMenuChange.bind(this);
    }

    handleDropDownMenuChange(event, index, value) {
        this.props.jsonChangeMode(value)
    }

    render() {
        const { path } = this.props;
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                    <ToolbarGroup>
                        <IconButton onTouchTap={this.props.handleSave}>
                            <SaveIcon />
                        </IconButton>
                        <IconButton onTouchTap={this.props.jsonCollapse}>
                            <ExpandLessIcon />
                        </IconButton>
                        <IconButton onTouchTap={this.props.jsonExpand}>
                            <ExpandMoreIcon />
                        </IconButton>
                        <IconButton onTouchTap={this.props.jsonUndo}>
                            <UndoIcon />
                        </IconButton>
                        <IconButton onTouchTap={this.props.jsonRedo}>
                            <RedoIcon />
                        </IconButton>
                        <DropDownMenu value={this.props.mode} style={styles.dropDownMenu} onChange={this.handleDropDownMenuChange} iconStyle={styles.dropDownMenuIcon}>
                            <MenuItem value={'tree'} primaryText="Tree" />
                            <MenuItem value={'text'} primaryText="Text" />
                        </DropDownMenu>
                        <JSONSearchBar style={styles.searchBar} changeAction={this.props.jsonSearchAction} />
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

const mapStateToProps = (state) => ({
    mode: state.jsonEditor.mode,
});

const mapDispatchToProps = (dispatch) => ({
    jsonSearchAction(value) {
        dispatch(searchJSON(value));
    },
    jsonCollapse() {
        dispatch(jsonEditorCollapse())
    },
    jsonExpand() {
        dispatch(jsonEditorExpand())
    },
    jsonUndo() {
        dispatch(jsonEditorUndo())
    },
    jsonRedo() {
        dispatch(jsonEditorRedo())
    },
    jsonChangeMode(mode) {
        dispatch(jsonEditorChangeMode(mode))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(EditToolbar);
