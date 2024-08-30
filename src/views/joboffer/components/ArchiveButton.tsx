import {  useNotify, useRecordContext, useRefresh } from "react-admin";
import { archiveJobOffer } from "../../../api/adminApi";

export const ArchiveButton = () => {
    const notify = useNotify();
    const refresh = useRefresh(); 
    const record = useRecordContext();
    const handleClick = async (event: any) => {
        try {
            event.stopPropagation(); // Prevent row click event from triggering
            const response = await archiveJobOffer(record?.id as string);
            console.log(response)
            if (response.status === 204) {
                notify('Job offer archived', { type: 'success' });
                refresh()
            } else {
                notify('Failed to archive job offer', { type: 'warning' });
            }
        } catch (error: any) {
            notify('Error: ' + error.message, { type: 'error' });
        }
    };
    
    return <button onClick={handleClick}>Archive</button>;
};