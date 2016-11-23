import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../../components/sidebar/Sidebar';

import WindowManager from '../../components/window/WindowManager'
import NamespaceDialog from '../../components/dialogs/NamespaceDialog';
import '../../../style/pages/homepage.scss';

class HomePage extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-page-container">
                <Sidebar/>
                <WindowManager />
                <NamespaceDialog open={this.props.openNamespaceDialog}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({openNameSpaceDialog: state.ui.openNamespaceDialog});

export default connect(mapStateToProps, null)(HomePage);
