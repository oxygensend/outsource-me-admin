import { useState } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import {  useNotify, useRecordContext } from "react-admin";
import { mailMessage } from "../../../api/adminApi";
import { getUserId } from "../../../utils/localStorage";
import SendIcon from '@mui/icons-material/Send';

export const MailForm = () => {
    const [open, setOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const record = useRecordContext();
    const notify = useNotify();

    const handleClickOpen = (event: any) => {
        event.stopPropagation(); // Prevent row click event from triggering
        setOpen(true);
    };

    const handleClose = (event: any) => {
        event.stopPropagation();
        setOpen(false);
    };

    const handleSend = async (event: any) => {
        event.stopPropagation();
        try {
            const response = await mailMessage({recipientId: record?.id as string,
                                            subject: subject,
                                            body: content,
                                            senderId: getUserId()
                                        })
            if (response.status === 202) {
                notify('Mail message sent', { type: 'success' });
            } else {
                notify('Failed to sent mail message', { type: 'warning' });
            }
        } catch (error: any) {
            notify('Error: ' + error.message, { type: 'error' });
        }

        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen} color="primary">
                <SendIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Send Email to {record?.name}</DialogTitle>
                <DialogContent onClick={(e) => e.stopPropagation()}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Subject"
                        type="text"
                        fullWidth
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        type="text"
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSend} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};