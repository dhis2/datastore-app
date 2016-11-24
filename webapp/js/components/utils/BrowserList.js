import React, { PropTypes, Component } from 'react'
import { List } from 'material-ui/List';
import BrowsingListRow from './BrowserListRow';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BrowserList extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <Table style={{flex: "1"}}>
          {this.props.children}
      </Table>
    )
  }
}

export default BrowserList;
