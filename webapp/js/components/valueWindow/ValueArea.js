import React, {PropTypes, Component} from 'react'

import DisplayArea from './DisplayArea';
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import ContentSave from 'material-ui/svg-icons/content/save';
import FontIcon from 'material-ui/FontIcon';

import '../../../style/valueWindow/valueWindow.scss';
import Paper from 'material-ui/Paper';

class ValueArea extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {value} = this.props;
        return (
            <Paper className={'value-container'}>
                <Paper style={{zIndex:5}}>
                <Toolbar>
                    <ToolbarTitle text="Value"/>
                    <ToolbarGroup>
                        <ContentSave />
                    </ToolbarGroup>
                </Toolbar></Paper>
                <DisplayArea/>
            </Paper>
        )
    }
}

export default ValueArea
