import React, {  Component } from 'react';
import {Link} from 'react-router';
import { ListGroupItem, Panel} from 'react-bootstrap';
import {LinkContainer, Accordion} from 'react-router-bootstrap';
import {fetchDataStoreValue} from '../actions/actions';

class ListItemExpandable extends Component {
  handleSelect() {
    fetchDataStoreValue(this.props.params.namespace,this.props.item);
  }
  render () {
    return (
        <Panel header={this.props.item} eventKey={this.props.key} onSelect={this.handleSelect}>
        </Panel>
    );
  }
}

export default ListItemExpandable;
