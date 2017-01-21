import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { searchSidebarChange } from '../../actions/uiActions';

export class Searchbar extends Component {
    render() {
        const { searchChanged, searchValue } = this.props;

        return (
            <TextField name="searchbar"
                hintText="Namespace#Key"
                floatingLabelStyle={{ top: '25px' }}
                style={{ height: 'auto' }}
                inputStyle={{ marginTop: '6px' }}
                floatingLabelText="Search"
                value={searchValue}
                onChange={({ target: { value } }) => searchChanged(value)}
                onFocus={() => searchChanged('')}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    searchChanged(value) {
        dispatch(searchSidebarChange(value));
    },
});

const mapStateToProps = (state) => ({
    searchValue: state.ui.searchValue,
});

Searchbar.propTypes = {
    searchChanged: PropTypes.func,
    searchValue: PropTypes.string,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Searchbar);
