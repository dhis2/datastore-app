import React, { PropTypes, Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

class BrowserListRow extends Component {
    render() {
        const { datastoreKey, lastModified, lastModifiedBy } = this.props;

        return (
            <TableRow>
                <TableRowColumn>{ datastoreKey }</TableRowColumn>
                <TableRowColumn>{ lastModified }</TableRowColumn>
                <TableRowColumn>{ lastModifiedBy }</TableRowColumn>
            </TableRow>
        );
    }
}

BrowserListRow.propTypes = {
    datastoreKey: PropTypes.string,
    lastModified: PropTypes.string,
    lastModifiedBy: PropTypes.string,
};

export default BrowserListRow;
