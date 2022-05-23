import { PropTypes } from '@dhis2/prop-types'
import TextField from 'material-ui/TextField'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchSidebarChange } from '../../actions/sidebarActions.js'

export class Searchbar extends Component {
    handleKeys = (event) => {
        if (event.key === 'Enter') {
            this.searchField.blur()
        }
    }

    render() {
        const { searchChanged, searchValue } = this.props
        return (
            <TextField
                name={'searchbar'}
                hintText={'Namespace#Key'}
                floatingLabelStyle={{ top: '25px' }}
                style={{ height: 'auto' }}
                inputStyle={{ marginTop: '6px' }}
                floatingLabelText={'Search'}
                value={searchValue}
                onChange={({ target: { value } }) => searchChanged(value)}
                onFocus={() => searchChanged('')}
                onKeyUp={this.handleKeys}
                ref={(searchField) => {
                    this.searchField = searchField
                }}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    searchChanged(value) {
        dispatch(searchSidebarChange(value))
    },
})

const mapStateToProps = (state) => ({
    searchValue: state.sidebar.searchValue,
})

Searchbar.propTypes = {
    searchChanged: PropTypes.func,
    searchValue: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)
