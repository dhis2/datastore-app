import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar } from 'material-ui/Toolbar';
import WindowToolbarTitle from '../WindowToolbarTitle';

class StatisticsToolbar extends Component {
    render() {
        const { namespace } = this.props;

        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                    <WindowToolbarTitle path={`${namespace}/statistics`} />
                </Toolbar>
            </Paper>
        );
    }
}

StatisticsToolbar.propTypes = {
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
};

export default StatisticsToolbar;
