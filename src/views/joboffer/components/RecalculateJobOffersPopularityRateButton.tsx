import { Button, useNotify, useRefresh } from "react-admin";
import { loadAddresses, recalculateDevelopersPopularityRate, recalculateJobOffersPopularityRate } from '../../../api/adminApi';
import CalculateIcon from '@mui/icons-material/Calculate'; 
export const RecalculateJobOffersPopularityRateButton = () => {
    const notify = useNotify();
    const refresh = useRefresh();
  
    const handleClick = async () => {
        try {
            const response = await recalculateJobOffersPopularityRate();
            console.log(response)
            if (response.status === 202) {
                notify('Started recalculating Job offers popularity rate ', { type: 'success' });
                refresh(); 
            } else {
                notify('Failed to start the process', { type: 'warning' });
            }
        } catch (error: any) {
            notify('Error: ' + error.message, { type: 'error' });
        }
    };
  
    return (
        <Button onClick={handleClick} label="Recalculate job offers popularity rate"   variant="contained"
        startIcon={<CalculateIcon/>}
        style={{
            margin: '10px 0',
            backgroundColor: '#4CAF50',
            color: 'white',
        }}/>
    );
  };
  