import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import HistoryToolbar from './HistoryToolbar';
import HistoryArea from './HistoryArea';

import WindowAreaHOC from '../../hoc/WindowAreaHOC';

import '../../../../style/valueWindow/valueWindow.scss';

class HistoryWindow extends Component {

    render() {
        const { loading, error, list } = this.props;
        const HistoryAreaImproved = WindowAreaHOC(HistoryArea, loading, error);

        return (
        <Paper className={'window'}>
            <HistoryToolbar />
            <HistoryAreaImproved list={list || []} />
        </Paper>
        );
    }
}

HistoryWindow.propTypes = {
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
)(HistoryWindow);
