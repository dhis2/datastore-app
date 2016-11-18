import React, {PropTypes, Component} from 'react'

import Sidebar from '../../components/sidebar/Sidebar';
import ValueArea from '../../components/valueWindow/ValueArea'

class HomePage extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="home-container">
            <Sidebar />
            <ValueArea />
          </div>
        );
    }
}

export default HomePage;
