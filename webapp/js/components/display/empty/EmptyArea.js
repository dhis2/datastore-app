import React, { Component } from 'react';
import { ModeCommentIconWithText } from '../../utils/Icons';
import Paper from 'material-ui/Paper';
import '../../../../style/window/window.scss';
import DisplayAreaHOC from '../../hoc/DisplayAreaHOC';

export class EmptyArea extends Component {
    render() {
        return (
        <Paper className={'fff-window'}>
            <ModeCommentIconWithText text={'Select a namespace and a key to edit.'} />
        </Paper>
        );
    }
}

export default DisplayAreaHOC(EmptyArea);
