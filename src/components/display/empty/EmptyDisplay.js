import Paper from 'material-ui/Paper'
import React, { Component } from 'react'
import EmptyArea from './EmptyArea'
import EmptyToolbar from './EmptyToolbar'
import '../../../../style/display/display.scss'

class EmptyDisplay extends Component {
    render() {
        return (
            <Paper zDepth={0} className={'fff-display'}>
                <EmptyToolbar />
                <EmptyArea />
            </Paper>
        )
    }
}

export default EmptyDisplay
