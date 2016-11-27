import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'

import EditWindow from './edit/EditWindow';
import EmptyWindow from './empty/EmptyWindow';
import BrowserWindow from './browser/BrowserWindow';
import HistoryWindow from './history/HistoryWindow';

class WindowManager extends Component {
    render() {
        const { currentWindow } = this.props;
        switch (currentWindow) {
        case 'edit':
            return <EditWindow />;
        case 'browser':
            return <BrowserWindow />;
        case 'history':
            return <HistoryWindow />;
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
