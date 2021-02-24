import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import React from 'react'
import Theme from '../../utils/theme'

const IconButtonElement = props => (
    <IconButton {...props} touch tooltipPosition="bottom-left">
        <MoreVertIcon color={Theme.palette.accent3Color} />
    </IconButton>
)

export default IconButtonElement
