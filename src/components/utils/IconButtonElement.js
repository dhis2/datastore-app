import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert.js'
import React, { Component } from 'react'
import Theme from '../../utils/theme.js'

// This needs to stay as a class as it is passed a ref by a Material UI
// component and functional components do not support refs
class IconButtonElement extends Component {
    render() {
        return (
            <IconButton {...this.props} touch tooltipPosition="bottom-left">
                <MoreVertIcon color={Theme.palette.accent3Color} />
            </IconButton>
        )
    }
}

export default IconButtonElement
