import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import StatisticsToolbar from './StatisticsToolbar';
import StatisticsArea from './StatisticsArea';

import '../../../../style/valueWindow/valueWindow.scss';
import { fetchHistoryForNamespace, fetchHistory } from '../../../actions/actions';

class StatisticsWindow extends Component {
    componentDidMount() {
        const { namespace, key } = this.props.params;
        if (typeof key !== 'undefined') {
            this.props.fetchHistory(namespace, key);
        } else {
            this.props.fetchHistoryForNamespace(namespace);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.key !== prevProps.params.key &&
            typeof this.props.params.key !== 'undefined') {
            this.props.fetchHistory(this.props.params.namespace, this.props.params.key);
        }
        else if (this.props.params.namespace !== prevProps.params.namespace) {
                 this.props.fetchHistoryForNamespace(this.props.params.namespace);
        }
    }

    render() {

        const { namespace } = this.props.params;
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

const mapDispatchToProps = (dispatch) => ({
    fetchHistoryForNamespace(namespace) {
        dispatch(fetchHistoryForNamespace(namespace))
    },
    fetchHistory(namespace, key) {
        dispatch(fetchHistory(namespace, key))
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatisticsWindow);
