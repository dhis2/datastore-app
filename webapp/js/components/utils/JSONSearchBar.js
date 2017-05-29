import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

export class JSONSearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.changeEvent = this.changeEvent.bind(this);
        this.handleKeys = this.handleKeys.bind(this);
    }

    handleKeys(event) {
        if (event.keyCode === 27) {
            this.searchField.blur();
        }
    }

    changeEvent(event) {
        const val = event.target.value;
        this.props.changeAction(val);
    }

    render() {
        return (
            <TextField name={'searchbar'}
                       floatingLabelText={'Search JSON'}
                       floatingLabelStyle={{top: '42px'}}
                       inputStyle={{marginTop: '13px'}}
                       onChange={this.changeEvent}
                       style={this.props.style}
                       onKeyUp={this.handleKeys}
                       underlineStyle={{maxWidth: '150px'}}
                       ref={(searchField) => {
                           this.searchField = searchField;
                       }}
            />
        );
    }
}

JSONSearchBar.propTypes = {
    style: PropTypes.object,
    changeAction: PropTypes.func,
};

export default JSONSearchBar;
