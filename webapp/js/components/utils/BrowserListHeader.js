import React, { PropTypes, Component } from 'react';
import { TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

class BrowserListHeader extends Component {
    render() {
        return (
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        );
    }
}

BrowserListHeader.propTypes = {

};

export default BrowserListHeader;
