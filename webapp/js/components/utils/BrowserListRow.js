import React, { PropTypes, Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

class BrowserListRow extends Component {
    render() {
        return (
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
        );
    }
}

BrowserListRow.propTypes = {

};

export default BrowserListRow;
