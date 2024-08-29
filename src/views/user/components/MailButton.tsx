import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


export const MailButton = ({ record }) => {
    const handleClick = () => {
        window.location.href = `mailto:${record.email}`;
    };

    return (
        <IconButton onClick={handleClick} color="primary">
            <SendIcon/>
        </IconButton>
    );
};