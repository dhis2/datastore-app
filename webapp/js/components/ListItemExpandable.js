import React, {  Component } from 'react';
import {Link} from 'react-router';
import { ListGroupItem, Panel, Collapse} from 'react-bootstrap';
import {LinkContainer, Accordion} from 'react-router-bootstrap';
import { FetchDatastoreValue} from '../actions/actions';

class ListItemExpandable extends Component {

  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleItem() {
    if(this.state.open)
      this.props.handleItem(this.props.item)
  }

  handleClick() {
    this.setState({open: !this.state.open}, () => {
      this.handleItem()
    })
  }

  getCollapsedItem() {
    if(!this.state.open) {
      return "Loading..."
    }

    const items = this.props.getCollapsedItem(this.props.item)
    if(!items || !items.length) {
      return "Loading..."
    } else {
      return items.toString()
    }
  }
  render () {
    const collapsed = this.getCollapsedItem()
    return (

        <div className="panel panel-default">
            <div className="panel-heading" onClick={this.handleClick.bind(this)}>
              {this.props.item}
            </div>
          <Collapse in={this.state.open}>
            <div className="panel-body">{collapsed}</div>
          </Collapse>
        </div>

    );
  }
}

export default ListItemExpandable;
