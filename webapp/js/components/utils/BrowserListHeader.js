import React, { Component } from 'react';
import { TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

class BrowserListHeader extends Component {
    render() {
        return (
          <TableHeader>
              <TableRow>
                  <TableHeaderColumn>Key</TableHeaderColumn>
                  <TableHeaderColumn>Last By</TableHeaderColumn>
                  <TableHeaderColumn>Last Modified</TableHeaderColumn>
              </TableRow>
          </TableHeader>
        );
    }
}

export default BrowserListHeader;
