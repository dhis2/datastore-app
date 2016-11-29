import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NamespaceItem from './NamespaceItem';
import { fetchNamespaces } from '../../actions/actions';
import { List } from 'material-ui/List';
import AppContainer from '../../containers/AppContainer';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { Spinner } from '../utils/Loaders';
import IconButton from 'material-ui/IconButton';

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
          <div className={'sidebar-list'} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Spinner size={'medium'} style={{ marginTop: '-60px' }} />
          </div>
        );
    }
    renderError() {
        return (
          <div className={'sidebar-list'} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <IconButton style={{ marginTop: '-60px' }} onTouchTap={this.props.fetchNamespaces}>
                <NavigationRefresh />
            </IconButton>
            <p>Try again</p>
          </div>
        );
    }

    renderList() {
        const { items, searchValue } = this.props;

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
        {Object.keys(items).sort().filter((item) => item.toLowerCase().includes(searchValue))
            .map((item, index) => (
                <NamespaceItem namespace={items[item]} key={index} />
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
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    items: PropTypes.object,
};

const mapStateToProps = (state) => ({
    items: state.api.namespaces,
    fetching: state.api.fetching,
    error: state.api.error,
    searchValue: state.ui.searchValue,
});

const mapDispatchToProps = (dispatch) => ({
    fetchNamespaces() {
        dispatch(fetchNamespaces());
    },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NamespaceList);
