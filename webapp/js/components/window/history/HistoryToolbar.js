import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar } from 'material-ui/Toolbar';
import WindowToolbarTitle from '../WindowToolbarTitle';

class HistoryToolbar extends Component {
    render() {
        const { namespace, selectedKey } = this.props;

        return (
            <Paper style={{ zIndex: 5 }}>
                <Toolbar>
                    <WindowToolbarTitle path={`${namespace}/${selectedKey}`} />
                </Toolbar>
            </Paper>
        );
    }
}

HistoryToolbar.propTypes = {
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
};

export default HistoryToolbar;
