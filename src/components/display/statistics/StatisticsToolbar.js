import DisplayToolbarTitle from 'components/display/DisplayToolbarTitle'
import Paper from 'material-ui/Paper'
import { Toolbar } from 'material-ui/Toolbar'
import React, { Component, PropTypes } from 'react'

class StatisticsToolbar extends Component {
    render() {
        const { namespace } = this.props

        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                    <DisplayToolbarTitle path={`${namespace}/statistics`} />
                </Toolbar>
            </Paper>
        )
    }
}

StatisticsToolbar.propTypes = {
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
}

export default StatisticsToolbar
