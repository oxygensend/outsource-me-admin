import { Button, useNotify, useRefresh } from "react-admin";
import { loadAddressesForceStop} from '../../../api/adminApi';
import CloudOff from '@mui/icons-material/CloudOff';

export const LoadAddressesForceStopButton = () => {
    const notify = useNotify();
    const refresh = useRefresh();
  
    const handleClick = async () => {
        try {
            const response = await loadAddressesForceStop();
            console.log(response)
            if (response.status === 200) {
                notify('Successfully stopped addresses reloading', { type: 'success' });
                refresh(); 
            } else {
                notify('Failed to stop addresses loading', { type: 'warning' });
            }
        } catch (error: any) {
            notify('Error: ' + error.message, { type: 'error' });
        }
    };
  
    return (
        <Button onClick={handleClick} label="Force stop loading"   variant="contained"
        startIcon={<CloudOff />}
        style={{
            margin: '10px 10px',
            backgroundColor: '#DF3100',
            color: 'white',
        }}/>
    );
  };
  