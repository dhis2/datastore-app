import React, { PropTypes, Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Theme from '../../utils/theme';


const style = {
    button: {
        cursor: 'default',
        maxWidth: '200px',
        textOverflow: 'ellipsis'
    },
    label: {
        paddingLeft: 0,
    }
}


class BreadcrumbHistoryButton extends Component {

    render() {
        const { label } = this.props;
        return (
          <FlatButton
              primary
              style={style.button}
              labelStyle={style.label}
              label={ label }
              labelPosition="before"
              disableTouchRipple
              hoverColor="rgba(0,0,0,0)"
          />
        );
    }
}

BreadcrumbHistoryButton.propTypes = {
    label: PropTypes.string,
    last: PropTypes.bool,
};

export default BreadcrumbHistoryButton;
