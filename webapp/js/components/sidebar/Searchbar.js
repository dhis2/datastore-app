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
        this.setState({
            searchVal: '',
        });
        this.props.searchChanged('');
    }
    handleChange(e) {
        const val = e.target.value
        this.setState({
            searchVal: val,
        });
        this.props.searchChanged(val.toLowerCase());
    }

    render() {
        return (
            <TextField name="searchbar"
                       hintText="Namespace#Key"
                       floatingLabelStyle={ { top: '25px' }}
                       style={{ height:'auto' }}
                       inputStyle={{ marginTop: '6px' }}
                       floatingLabelText="Search"
                       value={this.state.searchVal}
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
Searchbar.PropTypes = {
    searchChanged: PropTypes.function,
};
export default connect(null, mapDispatchToProps)(Searchbar);

