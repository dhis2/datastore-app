import React, { PropTypes, Component } from 'react';
import NamespaceItem from './NamespaceItem';
import { List } from 'material-ui/List';
import AppContainer from '../../containers/AppContainer';

const listStyle = {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 72px)',
    paddingTop: 0,
    margin: '8px 5px',
};

class NamespaceList extends Component {
    render() {
        const { items, search } = this.props;
        listStyle.backgroundColor = AppContainer.theme.palette.primary3Color;
        return (
            <List style={ listStyle }>
                {Object.keys(items).sort().filter((item) => item.toLowerCase().includes(search))
                    .map((item) => (
                        <NamespaceItem namespace={ items[item] } key={ item } />
                ))}
            </List>
        );
    }
}

NamespaceList.propTypes = {
    items: PropTypes.object,
    search: PropTypes.string,
};

export default NamespaceList;
