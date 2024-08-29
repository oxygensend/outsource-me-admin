// import { useState } from "react";
// import { IconButton } from '@mui/material';
// import WorkIcon from '@mui/icons-material/Work';

// export const MailForm = ({ record }) => {
//     const [open, setOpen] = useState(false);
//     const [subject, setSubject] = useState('');
//     const [content, setContent] = useState('');

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleSend = () => {
//         const mailtoLink = `mailto:${record.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
//         window.location.href = mailtoLink;
//         setOpen(false);
//     };

//     return (
//         <>
//             <IconButton onClick={handleClickOpen} color="primary">
//                 <WorkIcon />
//             </IconButton>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Send Email to {record.name}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Subject"
//                         type="text"
//                         fullWidth
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Content"
//                         type="text"
//                         fullWidth
//                         multiline
//                         rows={4}
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSend} color="primary">
//                         Send
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };