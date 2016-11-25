
import React, { PropTypes, Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

class BreadcrumbHistoryButton extends Component {
    render() {
        const { label } = this.props;
        return (
          <FlatButton
              label={ label }
              labelPosition="before"
              primary
              icon={ <ChevronRight /> }
          />
        );
    }
}

BreadcrumbHistoryButton.propTypes = {
    label: PropTypes.string,
};

export default BreadcrumbHistoryButton;
