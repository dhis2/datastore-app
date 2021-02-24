import React, { PropTypes, Component } from 'react'

class DialogRoute extends Component {
    render() {
        const DialogComponent = this.props.component
        return <DialogComponent />
    }
}

DialogRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
}

export default DialogRoute
