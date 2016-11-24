import React, { Component } from 'react';
import AppContainer from '../../containers/AppContainer';
import '../../../style/valueWindow/valueWindow.scss';
import { TableBody } from 'material-ui/Table';

import BrowserList from '../utils/BrowserList';
import BrowserListRow from '../utils/BrowserListRow';
import BrowserListHeader from '../utils/BrowserListHeader';

class BrowserArea extends Component {
    render() {
        return (
            <div className="window-area" style={{
                paddingTop: '8px',
                backgroundColor: AppContainer.theme.palette.primary3Color }}
            >
                <BrowserList>
                    <BrowserListHeader />
                    <TableBody>
                        <BrowserListRow />
                        <BrowserListRow />
                    </TableBody>
                </BrowserList>
            </div>
        );
    }
}

export default BrowserArea;
