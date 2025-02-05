import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const EditingModal = ({ title, open, onClose, onConfirm, currentMessage }) => {
    const [editedMessage, setEditedMessage] = useState(currentMessage);

	useEffect(() => {
		setEditedMessage(currentMessage);
	}, [currentMessage])

    const handleSave = () => {
        onConfirm(editedMessage);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={() => onClose(false)}
            aria-labelledby="edit-dialog"
        >
            <DialogTitle id="edit-dialog">{title}</DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    placeholder="Edite sua mensagem aqui"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => onClose(false)}
                    color="default"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditingModal;
