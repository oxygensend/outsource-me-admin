import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNotify, useRecordContext } from 'react-admin';
import { sendNotification } from '../../../api/adminApi';

export const NotificationForm = () => {
    const [open, setOpen] = useState(false);
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
            const response = await  sendNotification({
                id: record?.id as string,
                content: {
                    content: content,
                    recipients: [{id: record?.id as string}]
                },
                serviceId: "000000",
                login: "1234"
            });
            if (response.status === 200 && response.json.status === 'ok') {
                notify('Internal notification sent', { type: 'success' });
            } else {
                notify('Failed to sent internal notification', { type: 'warning' });
            }
        } catch (error: any) {
            notify('Error: ' + error.message, { type: 'error' });
        }

        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen} color="primary">
                <NotificationsIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Send Internal Notification to {record?.name}</DialogTitle>
                <DialogContent onClick={(e) => e.stopPropagation()}>
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