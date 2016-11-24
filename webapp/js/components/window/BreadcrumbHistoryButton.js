import React, { PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

class BreadcrumbHistoryButton extends React.Component {
  render () {
    const { label } = this.props;
    return (
      <FlatButton
        label={ label }
        labelPosition="before"
        primary={ true }
        icon={ <ChevronRight /> }/>
    );
  }
}

export default BreadcrumbHistoryButton;
