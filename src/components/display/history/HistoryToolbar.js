import { PropTypes } from '@dhis2/prop-types'
import Paper from 'material-ui/Paper'
import { Toolbar } from 'material-ui/Toolbar'
import React, { Component } from 'react'
import DisplayToolbarTitle from '../DisplayToolbarTitle'

const toolbarContainerStyle = {
    zIndex: 5,
}

class HistoryToolbar extends Component {
    render() {
        const { namespace, selectedKey } = this.props

        const path = selectedKey
            ? `${namespace}/${selectedKey}`
            : `${namespace}`

        return (
            <Paper style={toolbarContainerStyle}>
                <Toolbar>
                    <DisplayToolbarTitle path={path} />
                </Toolbar>
            </Paper>
        )
    }
}

HistoryToolbar.propTypes = {
    namespace: PropTypes.string,
    selectedKey: PropTypes.string,
}

export default HistoryToolbar
