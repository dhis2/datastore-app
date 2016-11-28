
import React, { PropTypes, Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

class BreadcrumbHistoryButton extends Component {
    render() {
        const { label, last } = this.props;
        return (
          <FlatButton
              label={ label }
              labelPosition="before"
              primary
              icon={ last ? null : <ChevronRight /> }
          />
        );
    }
}

BreadcrumbHistoryButton.propTypes = {
    label: PropTypes.string,
    last: PropTypes.bool,
};

export default BreadcrumbHistoryButton;
