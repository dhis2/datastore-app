import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import EditToolbar from './EditToolbar';
import EditArea from './EditArea';

import { fetchAndDisplayKeyValue, fetchAndToggleNamespace } from '../../../actions/actions';

import '../../../../style/valueWindow/valueWindow.scss';

export class EditWindow extends Component {

    componentDidMount() {
        const { getValue, params: { namespace, key } } = this.props;
        if (typeof namespace !== 'undefined' && typeof key !== 'undefined') {
            getValue(namespace, key);
        }
    }

    componentWillReceiveProps(nextProps) {

        const { fetchedNamespaces, params: nextParams } = nextProps;
        const { fetchKeysForNamespace,
            getValue,params: currentParams} = this.props;

        //Load keys for namespace if its not already loaded
        if(!this.props.fetchedNamespaces && fetchedNamespaces )  {
            fetchKeysForNamespace(nextParams.namespace)
        }
        //Get value when url is different from last, and namespaces are fetched.
        if((currentParams.namespace !== nextParams.namespace ||
            currentParams.key !== nextParams.key)  && fetchedNamespaces) {
            getValue(nextParams.namespace, nextParams.key);
        }
    }
    render() {
        const { namespace, key } = this.props.params;

        let path = '';

        if (typeof namespace !== 'undefined') {
            path += namespace;
        }
        if (typeof key !== 'undefined') {
            path += `/${key}`;
        }

        return (
        <Paper className={'fff-window'}>
            <EditToolbar path={path} />
            <EditArea namespace={ namespace } selectedKey={ key } />
        </Paper>
        );
    }
}

EditWindow.propTypes = {
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
    params: PropTypes.shape({
        namespace: PropTypes.string,
        key: PropTypes.string,
    }),
};

const mapStateToProps = (state) => ({
    value: state.ui.value,
    fetchedNamespaces : state.api.fetched
});

const mapDispatchToProps = (dispatch) => ({
    getValue(namespace, key) {
        dispatch(fetchAndDisplayKeyValue(namespace, key));
    },
    fetchKeysForNamespace(namespace) {
        dispatch(fetchAndToggleNamespace(namespace))
    }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWindow);
