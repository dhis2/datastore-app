import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NamespaceItem from './NamespaceItem';
import { List } from 'material-ui/List';
import Theme from '../../utils/theme';

const listStyle = {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 72px)',
    paddingTop: 0,
    margin: '8px 5px',
    backgroundColor: Theme.palette.primary3Color,
};

export class NamespaceList extends Component {

    constructor(props) {
        super(props);

        this.filterNamespaces = this.filterNamespaces.bind(this);
        this.searchKeyPart = this.searchKeyPart.bind(this);
    }

    filterNamespaces(item) {
        const searchValue = this.props.search || '';
        if (!searchValue) {
            return true;
        }
        let nameEnd = searchValue.indexOf('#');
        // Seperator not present, search entire word
        if (nameEnd < 0) {
            nameEnd = searchValue.length;
        }
        const nameSearch = searchValue.substring(0, nameEnd);
        return item.toLowerCase().includes(nameSearch);
    }

    /**
     * This is used to split the searchValue at '#' to get the
     * key-search part of the search. Used mainly for performance reasons,
     * so that the NamespaceItem do not re-render unnecessarily.
     * It only needs to re-render if the key-part of the search changes.
     * If we passed the entire searchValue it would re-render the nested Keylist
     * every time the searchValue changes - which is really bad performance wise.
     * @returns A string following '#' (excluding), empty string if separator is not
     * present.
     */
    searchKeyPart() {
        const { search } = this.props;
        const filterKeyInd = search.indexOf('#') + 1;
        const keySearch = search.substring(filterKeyInd, search.length);
        return filterKeyInd > 0 ? keySearch : '';
    }

    render() {
        const { items } = this.props;

        const keySearch = this.searchKeyPart();
        return (
            <List style={listStyle}>
                {Object.keys(items).sort().map(item => {
                    if (this.filterNamespaces(item)) {
                        return (
                          <NamespaceItem namespace={items[item]}
                              search={keySearch}
                              key={item}
                          />
                        );
                    }})
                }
            </List>
        );
    }
}

NamespaceList.propTypes = {
    items: PropTypes.object,
    search: PropTypes.string,
};

const mapStateToProps = (state) => ({
    search: state.ui.searchValue,
});


export default connect(
    mapStateToProps
)(NamespaceList);
