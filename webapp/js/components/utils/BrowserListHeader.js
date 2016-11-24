import React, { PropTypes, Component } from 'react'
import FileFolder from 'material-ui/svg-icons/file/folder';
import { ListItem } from 'material-ui/List';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BrowserListHeader extends Component {
  render () {
    return (
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        )
  }
}

export default BrowserListHeader;
