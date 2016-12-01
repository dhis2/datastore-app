import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../components/sidebar/Sidebar';
import DialogRoot from '../../components/dialog/DialogRoot';
import '../../../style/pages/homepage.scss';

class HomePage extends Component {

    render() {
        return (
            <div className="fff-home-page-container">
                <Sidebar />
                { this.props.children }
                <DialogRoot />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    openNameSpaceDialog: state.ui.openNamespaceDialog,
});

export default connect(
    mapStateToProps,
    null
)(HomePage);
