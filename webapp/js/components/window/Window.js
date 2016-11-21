import React, {PropTypes, Component} from 'react'

import DisplayArea from './DisplayArea';
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import ContentSave from 'material-ui/svg-icons/content/save';
import FontIcon from 'material-ui/FontIcon';

import BrowseWindow from './BrowseWindow';

import '../../../style/valueWindow/valueWindow.scss';


class EditWindow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {value} = this.props;
        return (
            <div className={'value-container'}>
                <Toolbar>
                    <ToolbarTitle text="Value"/>
                    <ToolbarGroup>
                        <ContentSave />
                    </ToolbarGroup>
                </Toolbar>
                <BrowseWindow />
            </div>
        )
    }
}

export default EditWindow
