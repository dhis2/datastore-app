import React, { PropTypes, Component } from 'react';
import { Table } from 'material-ui/Table';

class BrowserList extends Component {
    render() {
        return (
      <Table style={{ flex: '1' }}>
          {this.props.children}
      </Table>
        );
    }
}

BrowserList.propTypes = {
    children: PropTypes.array,
};

export default BrowserList;
