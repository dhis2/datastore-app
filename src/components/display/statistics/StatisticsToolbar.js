import { PropTypes } from '@dhis2/prop-types'
import Paper from 'material-ui/Paper'
import { Toolbar } from 'material-ui/Toolbar'
import React from 'react'
import DisplayToolbarTitle from '../DisplayToolbarTitle'

const StatisticsToolbar = ({ namespace }) => (
    <Paper style={{ zIndex: 5 }}>
        <Toolbar>
            <DisplayToolbarTitle path={`${namespace}/statistics`} />
        </Toolbar>
    </Paper>
)

StatisticsToolbar.propTypes = {
    namespace: PropTypes.string,
}

export default StatisticsToolbar
