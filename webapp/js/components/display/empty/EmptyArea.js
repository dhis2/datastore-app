import React, { Component } from 'react';
import { ModeCommentIconWithText } from 'components/utils/Icons';
import Paper from 'material-ui/Paper';
import DisplayAreaHOC from 'components/hoc/DisplayAreaHOC';
import '../../../../style/window/window.scss';

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
