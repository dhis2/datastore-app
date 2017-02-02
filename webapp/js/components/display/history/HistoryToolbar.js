import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar } from 'material-ui/Toolbar';
import DisplayToolbarTitle from 'components/display/DisplayToolbarTitle';

const toolbarContainerStyle = {
    zIndex: 5,
};

class HistoryToolbar extends Component {
    render() {
        const { namespace, selectedKey } = this.props;

        const path = selectedKey ?
          `${namespace}/${selectedKey}` : `${namespace}`;

        return (
            <Paper style={ toolbarContainerStyle }>
                <Toolbar>
                    <DisplayToolbarTitle path={ path } />
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
