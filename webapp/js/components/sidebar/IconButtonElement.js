import React, { Component } from 'react';
import Theme from '../../utils/theme';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class IconButtonElement extends Component {
    render() {
        const { ...props } = this.props;
        return (
            <IconButton {...props} touch tooltipPosition="bottom-left">
                <MoreVertIcon color={ Theme.palette.accent3Color } />
            </IconButton>
        );
    }
}

export default IconButtonElement;
