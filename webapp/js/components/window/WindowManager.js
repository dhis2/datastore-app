import React, { Component } from 'react';

import EditWindow from './EditWindow';
import EmptyWindow from './EmptyWindow';
import BrowserWindow from './BrowserWindow';

class WindowManager extends Component {
    render() {
        switch ('browser') {
        case 'edit':
            return <EditWindow />;
        case 'browser':
            return <BrowserWindow />;
        default:
            return <EmptyWindow />;
        }
    }
}

export default WindowManager;
