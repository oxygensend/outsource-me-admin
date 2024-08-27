import { Button, useNotify, useRefresh } from "react-admin";
import { clearUserCache } from "../../../api/adminApi";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export const ClearCacheButton = () => {
    const notify = useNotify();
    const refresh = useRefresh();
  
    const handleClick = async () => {
        try {
            const response = await clearUserCache();
            console.log(response)
            if (response.status === 204) {
                notify('User cache cleared', { type: 'success' });
                refresh(); 
            } else {
                notify('Failed to clear cache', { type: 'warning' });
            }
        } catch (error: any) {
            notify('Error: ' + error.message, { type: 'error' });
        }
    };
  
    return (
        <Button onClick={handleClick} label="Clear user cache"   variant="contained"
        startIcon={<DeleteForeverIcon/>}
        style={{
            margin: '10px 10px',
            backgroundColor: '#DF3100',
            color: 'white',
        }}/>
    );
  };