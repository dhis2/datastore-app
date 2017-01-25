import React, { PropTypes, Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class BreadcrumbHistoryButton extends Component {
    render() {
        const { label } = this.props;
        return (
          <FlatButton
              primary
              label={ label }
              labelPosition="before"
          />
        );
    }
}

BreadcrumbHistoryButton.propTypes = {
    label: PropTypes.string,
    last: PropTypes.bool,
};

export default BreadcrumbHistoryButton;
