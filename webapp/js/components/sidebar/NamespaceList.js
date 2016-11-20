import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';

import NamespaceItem from './NamespaceItem';
import { fetchNamespaces, fetchAndToggleNamespace } from '../../actions/actions';
import {List} from 'material-ui/List';
import AppContainer from '../../containers/AppContainer'
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
    )
  }

  renderError(error) {
    return (
      <span>ERROR!</span>
    )
  }

  renderList() {
    const {items, fetchAndToggleNamespace} = this.props;
    const style = { //toolbar height is 56px + 8px margin
      overflowY: 'auto',
      height:'calc(100% - 72px)',
      paddingTop:0,
      margin: '8px 5px',
      backgroundColor:AppContainer.theme.palette.primary3Color
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
    const {fetching, error, items} = this.props;

    if(fetching && Object.keys(items).length < 1) {
      return this.renderLoading()
    }

    if(error) {
      return this.renderError();
    }

    return this.renderList();
  }
}

const mapStateToProps = (state) => ({
  items: state.api.namespaces,
  fetching: state.api.fetching,
  error: state.api.error
});

const mapDispatchToProps = (dispatch) => ({
    fetchNamespaces() {
      dispatch(fetchNamespaces());
    },
    fetchAndToggleNamespace(namespace) {
      dispatch(fetchAndToggleNamespace(namespace));
    }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NamespaceList)
