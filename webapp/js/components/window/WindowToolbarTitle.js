import React, { PropTypes, Component } from 'react';
import BreadcrumbHistoryButton from '../utils/BreadcrumbHistoryButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import '../../../style/toolbarTitle.scss';
import Theme from '../../utils/theme';

class WindowToolbarTitle extends Component {
    renderPath(path) {
        const chevStyle = {
            fill: Theme.palette.primary1Color,
            verticalAlign: 'middle',

        }
        const pathArray = path.split('/');
        const length = pathArray.length - 1;
        return (
            <span className={'fff-toolbar-title'}>
                {pathArray.map((item, index) => {
                    return (
                        <span key={"s"+index}>
                            <BreadcrumbHistoryButton label={ item } key={ index } />
                            { index === length ? null : <ChevronRight style={chevStyle} /> }
                        </span>
                    )})}
            </span>
        );
    }

    renderDefault() {
        return (<span className="fff-toolbar-title">Value</span>);
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
