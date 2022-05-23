import React, { Component } from 'react'
import DisplayAreaHOC from '../../hoc/DisplayAreaHOC.js'
import { ModeCommentIconWithText } from '../../utils/Icons.js'
import styles from '../Display.module.css'

export class EmptyArea extends Component {
    render() {
        return (
            <div className={styles.display}>
                <ModeCommentIconWithText
                    text={'Select a namespace and a key to edit.'}
                />
            </div>
        )
    }
}

export default DisplayAreaHOC(EmptyArea)
