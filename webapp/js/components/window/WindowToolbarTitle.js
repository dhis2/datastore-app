import React, { PropTypes, Component } from 'react';

import BreadcrumbHistoryButton from '../utils/BreadcrumbHistoryButton';

class WindowToolbarTitle extends Component {
    renderPath(path) {
        const pathArray = path.split('/');

        return (
      <span className={'toolbar-title'}>
        {pathArray.map((item, index) => (
           <BreadcrumbHistoryButton label={ item } key={ index } />
          ))}
      </span>
        );
    }

    renderDefault() {
        return (
      <span className="toolbar-title">
        Value
      </span>
        );
    }

    render() {
        const { path } = this.props;

        if (path) {
            return this.renderPath(path);
        }

        return this.renderDefault();
    }
}

WindowToolbarTitle.propTypes = {
    path: PropTypes.string,
};

export default WindowToolbarTitle;
