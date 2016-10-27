import React, {Component} from 'react';
import ListItem from './ListItem';
import {ListGroup, Alert} from 'react-bootstrap';

class List extends Component {
    render() {
        const {items, error} = this.props;
        if(error) {
            return <Alert bsStyle="danger">Could not fetch from API.</Alert>
        }
        if (!items || !items.length) {
            return <h2>Loading...</h2>
        }

        const mappedItems = items.map(item => <ListItem key={item.key} item={item.key} />);
        return (
            <ListGroup>
             
                    {mappedItems}
              
            </ListGroup>
        );
    }
}

export default List

