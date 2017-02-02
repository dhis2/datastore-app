import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

export class JSONSearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.changeEvent = this.changeEvent.bind(this);
    }

    changeEvent(event) {
        this.props.changeAction(event.target.value);
    }

    render() {
        return (
            <TextField name={'searchbar'}
                floatingLabelText={'Search JSON'}
                floatingLabelStyle={{ top: '42px' }}
                inputStyle={{ marginTop: '13px' }}
                style={{ height: 'auto' }}
                onChange={this.changeEvent}
                style={this.props.style}
            />
        );
    }
}

JSONSearchBar.propTypes = {
    style: PropTypes.obj,
    changeAction: PropTypes.func,
};

export default JSONSearchBar;
