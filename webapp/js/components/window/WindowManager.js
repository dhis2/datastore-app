import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import EditWindow from './edit/EditWindow';
import EmptyWindow from './empty/EmptyWindow';
import BrowserWindow from './browser/BrowserWindow';

class WindowManager extends Component {
    render() {
        const { currentWindow } = this.props;
        switch ('edit') {
        case 'edit':
            return <EditWindow />;
        case 'browser':
            return <BrowserWindow />;
        default:
            return <EmptyWindow />;
        }
    }
}

WindowManager.propType = {
    currentWindow: PropTypes.string,
};

const connectStateToProps = (state) => ({
    currentWindow: state.window.currentWindow,
});

export default connect(
  connectStateToProps
)(WindowManager);
