import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux';
import DisplayArea from './DisplayArea';
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import ContentSave from 'material-ui/svg-icons/content/save';
import IconButton from 'material-ui/IconButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import FontIcon from 'material-ui/FontIcon';
import '../../../style/valueWindow/valueWindow.scss';
import Paper from 'material-ui/Paper';
import {updateValue} from '../../actions/actions';

class ValueArea extends Component {

    constructor(props) {
        super(props);
    }

    handleSave() {
        const { namespace, selectedKey, editedValue, updateValue } = this.props;
        if(editedValue) {
            updateValue(namespace,selectedKey,editedValue);
        }
    }

    render() {
        console.log(this.props);
        const { namespace, selectedKey } = this.props;
        const titleSelected = (<span className="toolbar-title">{namespace} <ChevronRight /> {selectedKey}</span>)
        const titleValue = (<span className="toolbar-title">Value</span>)
        const title = namespace && selectedKey ? titleSelected : titleValue;

        return (
            <Paper className={'value-container'}>
                <Paper style={{zIndex:5}}>
                <Toolbar>
                    {title}
                    <ToolbarGroup>
                        <IconButton onTouchTap={this.handleSave.bind(this)}>
                            <ContentSave />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar></Paper>
                <DisplayArea/>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    namespace: state.ui.namespace,
    selectedKey: state.ui.key,
    editedValue: state.ui.editedValue

})

const mapDispatchToProps = (dispatch) => ({
    updateValue(namespace,key,value) {
        dispatch(updateValue(namespace,key,value))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ValueArea);
