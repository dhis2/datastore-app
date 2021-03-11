import { PropTypes } from '@dhis2/prop-types'
import TextField from 'material-ui/TextField'
import React from 'react'

export class JSONSearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.changeEvent = this.changeEvent.bind(this)
        this.handleKeys = this.handleKeys.bind(this)
    }

    handleKeys(event) {
        if (event.keyCode === 27) {
            this.searchField.blur()
        }
    }

    changeEvent(event) {
        const val = event.target.value
        this.props.changeAction(val)
    }

    render() {
        const { jsonLength } = this.props
        const fieldProps = {
            disabled: false,
        }
        if (jsonLength && jsonLength > 500000) {
            fieldProps.disabled = true
            fieldProps.title = 'Object is too big to search'
        }
        return (
            <TextField
                name={'searchbar'}
                floatingLabelText={'Search Object'}
                floatingLabelStyle={{ top: '42px' }}
                inputStyle={{ marginTop: '13px' }}
                onChange={this.changeEvent}
                style={this.props.style}
                onKeyUp={this.handleKeys}
                underlineStyle={{ maxWidth: '150px' }}
                ref={searchField => {
                    this.searchField = searchField
                }}
                {...fieldProps}
            />
        )
    }
}

JSONSearchBar.propTypes = {
    changeAction: PropTypes.func,
    jsonLength: PropTypes.number,
    style: PropTypes.object,
}

export default JSONSearchBar
