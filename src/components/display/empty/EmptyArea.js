import DisplayAreaHOC from 'components/hoc/DisplayAreaHOC'
import { ModeCommentIconWithText } from 'components/utils/Icons'
import Paper from 'material-ui/Paper'
import React, { Component } from 'react'
import '../../../../style/display/display.scss'

export class EmptyArea extends Component {
    render() {
        return (
            <div className={'fff-display'}>
                <ModeCommentIconWithText
                    text={'Select a namespace and a key to edit.'}
                />
            </div>
        )
    }
}

export default DisplayAreaHOC(EmptyArea)
