import React, {Component} from 'react';
import ListItemExpandable from './ListItemExpandable';
import {Accordion, Alert, PanelGroup} from 'react-bootstrap';
class JSONNavigator extends Component {
    render() {
        const {json, error} = this.props;
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
            <PanelGroup>

                {mappedItems}

            </PanelGroup>

        );
    }
}

export default JSONNavigator

