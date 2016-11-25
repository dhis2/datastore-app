import React, { Component, PropTypes } from 'react';
import AppContainer from '../../../containers/AppContainer';
import Paper from 'material-ui/Paper';
import '../../../../style/valueWindow/valueWindow.scss';
import { TableBody, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, Table } from 'material-ui/Table';

class HistoryArea extends Component {
    render() {
        const { list } = this.props;

        return (
          <Paper>
              <div className="window-area" style={{
                  backgroundColor: AppContainer.theme.palette.primary3Color }}
              >
                  <Table fixedHeader selectable multiSelectable>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Key</TableHeaderColumn>
                            <TableHeaderColumn>Last By</TableHeaderColumn>
                            <TableHeaderColumn>Last Modified</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                      <TableBody showRowHover>
                        {list.map((row, index) => (
                              <TableRow key={ index }>
                                  <TableRowColumn>{row.key}</TableRowColumn>
                                  <TableRowColumn>{row.lastModifiedBy}</TableRowColumn>
                                  <TableRowColumn>{row.lastModifiedDate}</TableRowColumn>
                              </TableRow>
                        ))}
                      </TableBody>
                  </Table>
              </div>
            </Paper>
        );
    }
}

HistoryArea.propTypes = {
    list: PropTypes.array,
};

export default HistoryArea;
