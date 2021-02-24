import { PropTypes } from '@dhis2/prop-types'
import { searchSidebarChange } from 'actions/sidebarActions'
import TextField from 'material-ui/TextField'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Searchbar extends Component {
    constructor(props) {
        super(props)
        this.handleKeys = this.handleKeys.bind(this)
    }

    handleKeys(event) {
        if (event.keyCode === 27) {
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
                ref={searchField => {
                    this.searchField = searchField
                }}
            />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    searchChanged(value) {
        dispatch(searchSidebarChange(value))
    },
})

const mapStateToProps = state => ({
    searchValue: state.sidebar.searchValue,
})

Searchbar.propTypes = {
    searchChanged: PropTypes.func,
    searchValue: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)
