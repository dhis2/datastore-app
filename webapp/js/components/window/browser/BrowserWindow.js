import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import BrowserToolbar from './BrowserToolbar';
import BrowserArea from './BrowserArea';

import WindowAreaHOC from '../../hoc/WindowAreaHOC';

import '../../../../style/valueWindow/valueWindow.scss';

class BrowserWindow extends Component {

    render() {
        const { loading, error, list } = this.props;
        const BrowserAreaImproved = WindowAreaHOC(BrowserArea, loading, error);

        return (
        <Paper className={'window'}>
            <BrowserToolbar />
            <BrowserAreaImproved list={list || []} />
        </Paper>
        );
    }
}

BrowserWindow.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    list: PropTypes.array,
};

const mapStateToProps = (state) => ({
    loading: state.ui.fetching,
    namespace: state.ui.namespace,
    selectedKey: state.ui.key,
    list: state.browser.browserList,
    error: false,
});

export default connect(
  mapStateToProps
)(BrowserWindow);
