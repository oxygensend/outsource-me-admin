import { Button, useNotify, useRefresh } from "react-admin";
import { loadAddresses } from "../../../api/adminApi";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const LoadAddressesButton = () => {
    const notify = useNotify();
    const refresh = useRefresh();
  
    const handleClick = async () => {
        try {
            const response = await loadAddresses();
            console.log(response)
            if (response.status === 200) {
                notify('Started loading addresses in', { type: 'success' });
                refresh(); 
            } else {
                notify('Failed to load addresses', { type: 'warning' });
            }
        } catch (error: any) {
            notify('Error: ' + error.message, { type: 'error' });
        }
    };
  
    return (
        <Button onClick={handleClick} label="Load Addresses"   variant="contained"
        startIcon={<CloudUploadIcon />}
        style={{
            margin: '10px 0',
            backgroundColor: '#4CAF50',
            color: 'white',
        }}/>
    );
  };
  