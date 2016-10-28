import React, {  Component } from 'react';
import {Link} from 'react-router';
import { ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {fetchDataStoreValue} from '../actions/actions';

class ListItem extends Component {
  render () {
    return (
        <LinkContainer to={"browse/"+this.props.item}>
        <ListGroupItem>{this.props.item} <span className="glyphicon glyphicon-remove-circle"></span></ListGroupItem>
        </LinkContainer>
    );
  }
}

export default ListItem

