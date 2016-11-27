import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import StatisticsToolbar from './StatisticsToolbar';
import StatisticsArea from './StatisticsArea';

import '../../../../style/valueWindow/valueWindow.scss';

class StatisticsWindow extends Component {

    render() {
        return (
        <Paper className={'value-container'}>
            <StatisticsToolbar namespace={this.props.namespace}/>
            <StatisticsArea list={this.props.history} namespace={this.props.namespace}/>
        </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    namespace: state.window.namespace,
    history: state.window.history,
});

export default connect(
    mapStateToProps
)(StatisticsWindow);