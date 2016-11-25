import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import NamespaceItem from './NamespaceItem';
import { fetchNamespaces, fetchAndToggleNamespace } from '../../actions/actions';
import { List } from 'material-ui/List';
import AppContainer from '../../containers/AppContainer';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';

class NamespaceList extends Component {
    constructor(props) {
        super(props);

        this.renderLoading = this.renderLoading.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    componentDidMount() {
        this.props.fetchNamespaces();
    }

    renderLoading() {
        return (
      <span>LOADING!</span>
        );
    }

    renderError() {
        return (
      <RaisedButton
          label="Try again"
          icon={<NavigationRefresh />}
          onClick={this.props.fetchNamespaces}
      />
        );
    }

    renderList() {
        const { items, fetchAndToggleNamespace } = this.props;

        const style = { // toolbar height is 56px + 8px margin
            overflowY: 'auto',
            overflowX: 'hidden',
            height: 'calc(100% - 72px)',
            paddingTop: 0,
            margin: '8px 5px',
            backgroundColor: AppContainer.theme.palette.primary3Color,
        };

        return (
        <List style={style}>
        {Object.keys(items).map((item, index) => (
            <NamespaceItem namespace={items[item]} event={fetchAndToggleNamespace} key={index} />
        ))}
        </List>
        );
    }

    render() {
        const { fetching, error, items } = this.props;

        if (fetching && Object.keys(items).length < 1) {
            return this.renderLoading();
        }

        if (error) {
            return this.renderError();
        }

        return this.renderList();
    }
}


NamespaceList.propTypes = {
    fetchNamespaces: PropTypes.func,
    fetchAndToggleNamespace: PropTypes.func,
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    items: PropTypes.object,
};

const mapStateToProps = (state) => ({
    items: state.api.namespaces,
    fetching: state.api.fetching,
    error: state.api.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchNamespaces() {
        dispatch(fetchNamespaces());
    },
    fetchAndToggleNamespace(namespace) {
        dispatch(fetchAndToggleNamespace(namespace));
    },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NamespaceList);
