import Paper from 'material-ui/Paper'
import React, { Component } from 'react'
import styles from '../Display.module.css'
import EmptyArea from './EmptyArea'
import EmptyToolbar from './EmptyToolbar'

class EmptyDisplay extends Component {
    render() {
        return (
            <Paper zDepth={0} className={styles.display}>
                <EmptyToolbar />
                <EmptyArea />
            </Paper>
        )
    }
}

export default EmptyDisplay
