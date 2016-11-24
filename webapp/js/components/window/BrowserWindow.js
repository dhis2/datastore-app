import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import '../../../style/utils/lists.scss';

import BrowserToolbar from './BrowserToolbar';
import BrowserArea from './BrowserArea';

import WindowAreaHOC from '../hoc/WindowAreaHOC';

class BrowserWindow extends Component {

    render() {
        const { loading, error } = this.props;
        const BrowserAreaImproved = WindowAreaHOC(BrowserArea, loading, error);

        return (
        <Paper className={'value-container'}>
          <BrowserToolbar />
          <BrowserAreaImproved />
        </Paper>
        );
    }
}

BrowserWindow.propTypes = {
    loading: PropTypes.boolean,
    error: PropTypes.boolean,
};

const mapStateToProps = (state) => ({
    loading: state.ui.fetching,
    namespace: state.ui.namespace,
    selectedKey: state.ui.key,
    error: false,
});

export default connect(
  mapStateToProps
)(BrowserWindow);
