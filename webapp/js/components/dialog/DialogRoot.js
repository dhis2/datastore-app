import React, { PropTypes, Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class DialogRoot extends Component {

    static buildButton(action, text, primary = false) {
        return (<FlatButton
            label={text}
            primary={primary}
            onTouchTap={action}
        />);
    }

    render() {
        const { title,
                cancelAction,
                cancelLabel,
                approveAction,
                approveLabel,
                contentStyle } = this.props;

        const actions = [];

        cancelAction && actions.push(DialogRoot.buildButton(cancelAction, cancelLabel || 'Cancel'));
        approveAction && actions.push(DialogRoot.buildButton(approveAction, approveLabel || 'Done', true));

        return (<Dialog
            open
            title={title}
            actions={actions}
            modal={false}
            contentStyle={contentStyle || {}}
            onRequestClose={cancelAction}
        >
            {this.props.children}
        </Dialog>);
    }
}

DialogRoot.propTypes = {
    title: PropTypes.string,
    cancelLabel: PropTypes.string,
    approveLabel: PropTypes.string,
    cancelAction: PropTypes.func,
    approveAction: PropTypes.func,
    contentStyle: PropTypes.object,
};

export default DialogRoot;
