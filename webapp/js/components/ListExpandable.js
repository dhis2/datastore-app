import React, {Component} from 'react';
import ListItemExpandable from './ListItemExpandable';
import {LinkContainer} from 'react-router-bootstrap';
import "../../style/main.scss";

import {Accordion, Alert, PanelGroup, Button, Glyphicon} from 'react-bootstrap';
class ListExpandable extends Component {
    render() {
        const {items, error} = this.props;
        if(error) {
            return <Alert bsStyle="danger">Could not fetch from API.</Alert>
        }
        if (!items || !items.length) {
            return <h2>Loading...</h2>
        }
        const mappedItems = items.map(item =>
            <ListItemExpandable key={item} item={item} handleItem={this.props.handleItem}
                                getCollapsedItem={this.props.getCollapsedItem}/>);
        return (

            <div className="panel panel-default">
                <div className="panel-heading">
                    <LinkContainer to="/browse/">
                        <Button>
                            <Glyphicon glyph="glyphicon glyphicon-menu-left" /></Button>
                    </LinkContainer>
                   <h4> {this.props.namespace}</h4>
                </div>
                <div className="panel-body">
                    {mappedItems}
                </div>
            </div>

        );
    }
}

export default ListExpandable

