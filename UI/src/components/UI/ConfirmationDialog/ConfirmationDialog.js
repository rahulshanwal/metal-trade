import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ConfirmationDialog = (props) => {
    const actions = [
        <FlatButton
            label="No"
            primary={true}
            onClick={props.handleCancelClick}
        />,
        <FlatButton
            label="YES"
            primary={true}
            onClick={props.handleSubmitClick}
        />,
        ];
    return (
        <div>
            <Dialog
            title={props.title}
            actions={actions}
            modal={true}
            open={props.open}>
            {props.text}
            </Dialog>
        </div>
    );
}

export default ConfirmationDialog;