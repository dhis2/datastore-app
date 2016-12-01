import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { searchSidebarChange } from '../../actions/uiActions';

class Searchbar extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            searchVal: '',
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleFocus() {
        const { searchChanged } = this.props;

        this.setState({
            searchVal: '',
        });

        searchChanged('');
    }

    handleChange(e) {
        const val = e.target.value.toLowerCase();
        const { searchChanged } = this.props;

        this.setState({
            searchVal: val,
        });

        searchChanged(val);
    }

    render() {
        return (
            <TextField name="searchbar" hintText="Search" value={this.state.searchVal}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    searchChanged(value) {
        dispatch(searchSidebarChange(value));
    },
});

Searchbar.propTypes = {
    searchChanged: PropTypes.func,
};

export default connect(
    null,
    mapDispatchToProps
)(Searchbar);
