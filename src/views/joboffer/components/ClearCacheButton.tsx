import { Button, useNotify, useRefresh } from "react-admin";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { clearJobOfferCache } from "../../../api/adminApi";
export const ClearCacheButton = () => {
    const notify = useNotify();
    const refresh = useRefresh();
  
    const handleClick = async () => {
        try {
            const response = await clearJobOfferCache();
            console.log(response)
            if (response.status === 204) {
                notify('Job offer cache cleared', { type: 'success' });
                refresh(); 
            } else {
                notify('Failed to clear cache', { type: 'warning' });
            }
        } catch (error: any) {
            notify('Error: ' + error.message, { type: 'error' });
        }
    };
  
    return (
        <Button onClick={handleClick} label="Clear job offer cache"   variant="contained"
        startIcon={<DeleteForeverIcon/>}
        style={{
            margin: '10px 10px',
            backgroundColor: '#DF3100',
            color: 'white',
        }}/>
    );
  };