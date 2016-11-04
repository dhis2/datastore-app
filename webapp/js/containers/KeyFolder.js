import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { FetchDataStoreKeys, FetchDatastoreValue} from '../actions/actions.js';
import {Panel } from 'react-bootstrap';
import ListExpandable from "../components/ListExpandable"

const mapStateToProps = (state,ownProps) => {
    return {
        keys: state.api.keys,
        values: state.api.values
    }
}
class KeyFolder extends Component {
    componentDidMount() {
        this.props.dispatch(FetchDataStoreKeys(this.props.params.namespace))
            
    }

    getValueOfKey(key) {
        if(this.props.values) {
            return this.props.values
        }

    }

    handleItemClick(itemKey) {
        this.props.dispatch(FetchDatastoreValue(this.props.params.namespace,itemKey));
    }
    render () {
        return (
            <ListExpandable items={this.props.keys} namespace={this.props.params.namespace}
                            handleItem={this.handleItemClick.bind(this)}
                            getCollapsedItem={this.getValueOfKey.bind(this)}/>
        );
    }
}
const KeyFold = connect(mapStateToProps)(KeyFolder)
export default KeyFold
