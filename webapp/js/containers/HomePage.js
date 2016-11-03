import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux';

import List from '../components/List';

class HomePage extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
    }

    render() {
        const {listItems} = this.props;
        return (<List items={listItems}/>);
    }
}

const mapStateToProps = (state) => {
    return {listItems: []}
}

export default connect(mapStateToProps, {})(HomePage);
