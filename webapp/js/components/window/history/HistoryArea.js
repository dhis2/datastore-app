import React, { Component, PropTypes } from 'react';
import AppContainer from '../../../containers/AppContainer';
import Paper from 'material-ui/Paper';
import '../../../../style/valueWindow/valueWindow.scss';
import { TableBody, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, Table } from 'material-ui/Table';
import WindowAreaHOC from '../../hoc/WindowAreaHOC';

class HistoryArea extends Component {
    render() {
        const { list } = this.props;

        return (
              <div className="window-area" style={{
                  backgroundColor: AppContainer.theme.palette.primary3Color }}
              >
                  <Table fixedHeader headerStyle={{ 'border-bottom': 'solid grey 1px' }}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Namespace/Key</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                            <TableHeaderColumn>Change</TableHeaderColumn>
                            <TableHeaderColumn>Date Modified</TableHeaderColumn>
                            <TableHeaderColumn>Modified By</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                      <TableBody showRowHover displayRowCheckbox={false}>
                        {list.map((row, index) => (
                              <TableRow key={ index }>
                                  <TableRowColumn>{row.name}</TableRowColumn>
                                  <TableRowColumn>{row.action}</TableRowColumn>
                                  <TableRowColumn>{typeof row.value === 'object' ?
                                      JSON.stringify(row.value) : row.value}
                                  </TableRowColumn>
                                  <TableRowColumn>{row.date}</TableRowColumn>
                                  <TableRowColumn>{row.user}</TableRowColumn>
                              </TableRow>
                        ))}
                      </TableBody>
                  </Table>
              </div>
        );
    }
}

HistoryArea.propTypes = {
    list: PropTypes.array,
};

export default WindowAreaHOC(HistoryArea);
