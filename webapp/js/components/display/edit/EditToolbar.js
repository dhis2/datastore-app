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

import FormatAlignLeftIcon from 'material-ui/svg-icons/editor/format-align-left';
import FormatAlignJustifyIcon from 'material-ui/svg-icons/editor/format-align-justify';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import JSONSearchBar from 'components/utils/JSONSearchBar';
import { searchJSON,
    jsonEditorCollapse,
    jsonEditorExpand,
    jsonEditorUndo,
    jsonEditorRedo,
    jsonEditorChangeMode,
    jsonEditorCompact,
    jsonEditorFormat,
} from 'actions/jsonEditorActions';
import { debounce } from '../../../utils/utils';
import { Spinner } from '../../utils/Loaders';

const styles = {
    dropDownMenuIcon: {
        fill: 'black',
    },
    dropDownMenu: {
        marginBottom: '6px',
    },
    searchBar: {
        marginBottom: '25px',
        maxWidth: '150px',
        padding: '0 16px 0 16px'
    },
};

export class EditToolbar extends React.Component {

    constructor(props) {
        super(props);

        this.renderTreeEdit = this.renderTreeEdit.bind(this);
        this.renderCodeEdit = this.renderCodeEdit.bind(this);
        this.handleDropDownMenuChange = this.handleDropDownMenuChange.bind(this);

        this.state = {
            debounced: null
        }
    }

    handleDropDownMenuChange(event, index, mode) {
        this.props.jsonChangeMode(mode);
    }

    handleJsonSearch(value) {
        const now = Date.now();
        //debounce search
        if(this.state.debounced) {
            this.state.debounced(value);
        } else {
            const debounced = debounce((val) => {
                console.log("asf")
                this.props.jsonSearchAction(val);
            }, 250);
            this.setState({...this.state, debounced});
            debounced(value);
        }
    }

    static renderSavingSpinner() {
        return (<Spinner style={{position: 'relative'}} />)
    }

    renderTreeEdit() {
        const { path, saving } = this.props;
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>

                    <ToolbarGroup>
                        <IconButton onTouchTap={this.props.handleSave} tooltip="Save" disabled={saving}>
                            { saving ? EditToolbar.renderSavingSpinner() : <SaveIcon /> }
                        </IconButton>
                        <DropDownMenu value={this.props.mode}
                                      style={styles.dropDownMenu}
                                      onChange={this.handleDropDownMenuChange}
                                      iconStyle={styles.dropDownMenuIcon}
                        >
                            <MenuItem value={'tree'} primaryText="Tree" />
                            <MenuItem value={'code'} primaryText="Code" />
                        </DropDownMenu>
                        <IconButton onTouchTap={this.props.jsonCollapse} tooltip="Collapse">
                            <ExpandLessIcon />
                        </IconButton>
                        <IconButton onTouchTap={this.props.jsonExpand} tooltip="Expand">

                            <ExpandMoreIcon />
                        </IconButton>

                        <IconButton onTouchTap={this.props.jsonUndo} tooltip="Undo">
                            <UndoIcon />
                        </IconButton>
                        <IconButton onTouchTap={this.props.jsonRedo} tooltip="Redo">
                            <RedoIcon />
                        </IconButton>

                        <JSONSearchBar style={styles.searchBar} jsonLength={this.props.jsonEditor.jsonLength} changeAction={this.handleJsonSearch.bind(this)} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <DisplayToolbarTitle path={path} />
                    </ToolbarGroup>
                </Toolbar>
            </Paper>
        );
    }

    renderCodeEdit() {
        const { path } = this.props;
        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                    <ToolbarGroup>
                        <IconButton onTouchTap={this.props.handleSave} tooltip="Save">
                            <SaveIcon />
                        </IconButton>
                        <DropDownMenu value={this.props.mode}
                                      style={styles.dropDownMenu}
                                      onChange={this.handleDropDownMenuChange}
                                      iconStyle={styles.dropDownMenuIcon}
                        >
                            <MenuItem value={'tree'} primaryText="Tree" />
                            <MenuItem value={'code'} primaryText="Code" />
                        </DropDownMenu>
                        <IconButton onTouchTap={this.props.jsonFormat} tooltip="Format">
                            <FormatAlignLeftIcon />
                        </IconButton>
                        <IconButton onTouchTap={this.props.jsonCompact} tooltip="Format Compact">
                            <FormatAlignJustifyIcon />
                        </IconButton>

                    </ToolbarGroup>
                    <ToolbarGroup>
                        <DisplayToolbarTitle path={path} />
                    </ToolbarGroup>
                </Toolbar>
            </Paper>
        );
    }

    render() {
        const { mode } = this.props;

        if (mode === 'tree') {
            return this.renderTreeEdit();
        }

        return this.renderCodeEdit();
    }
}

EditToolbar.propTypes = {
    handleSave: PropTypes.func,
    path: PropTypes.string,
    mode: PropTypes.string,
    jsonCompact: PropTypes.func,
    jsonSearchAction: PropTypes.func,
    jsonCollapse: PropTypes.func,
    jsonExpand: PropTypes.func,
    jsonFormat: PropTypes.func,
    jsonUndo: PropTypes.func,
    jsonRedo: PropTypes.func,
    jsonChangeMode: PropTypes.func,
};

const mapStateToProps = state => ({
    mode: state.jsonEditor.mode,
    jsonEditor: state.jsonEditor,
    saving: state.jsonEditor.saving,
});

const mapDispatchToProps = dispatch => ({
    jsonSearchAction(value) {
        dispatch(searchJSON(value));
    },
    jsonCollapse() {
        dispatch(jsonEditorCollapse());
    },
    jsonExpand() {
        dispatch(jsonEditorExpand());
    },
    jsonCompact() {
        dispatch(jsonEditorCompact());
    },
    jsonFormat() {
        dispatch(jsonEditorFormat());
    },
    jsonUndo() {
        dispatch(jsonEditorUndo());
    },
    jsonRedo() {
        dispatch(jsonEditorRedo());
    },
    jsonChangeMode(mode) {
        dispatch(jsonEditorChangeMode(mode));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditToolbar);
