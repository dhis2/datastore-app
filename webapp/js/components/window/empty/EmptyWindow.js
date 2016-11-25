import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import EmptyToolbar from './EmptyToolbar';
import EmptyArea from './EmptyArea';

import '../../../../style/valueWindow/valueWindow.scss';
import WindowAreaHOC from '../../hoc/WindowAreaHOC';


class EmptyWindow extends Component {
    render() {
        const { loading, error } = this.props;
        const EmptyAreaImproved = WindowAreaHOC(EmptyArea, loading, error);
        return (
        <Paper className={'value-container'}>
          <EmptyToolbar />
          <EmptyAreaImproved />
        </Paper>
        );
    }
}

EmptyWindow.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    loading: state.ui.fetching,
    error: false,
});

export default connect(
  mapStateToProps
)(EmptyWindow);
