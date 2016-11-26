import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import HistoryToolbar from './HistoryToolbar';
import HistoryArea from './HistoryArea';

import '../../../../style/valueWindow/valueWindow.scss';

class HistoryWindow extends Component {

    render() {
        const { history, namespace, selectedKey } = this.props;

        return (
        <Paper className={'window'}>
            <HistoryToolbar namespace={ namespace } selectedKey={ selectedKey } />
            <HistoryArea list={ history } selectedKey={ selectedKey } />
        </Paper>
        );
    }
}

HistoryWindow.propTypes = {
    history: PropTypes.array,
    namespace: PropTypes.string,
    selectedKey: PropTypes.string,
};

const mapStateToProps = (state) => ({
    namespace: state.window.namespace,
    selectedKey: state.window.key,
    history: state.window.history,
});

export default connect(
  mapStateToProps
)(HistoryWindow);
