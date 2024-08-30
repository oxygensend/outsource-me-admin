import { useDataProvider, useNotify, useRecordContext, useRefresh } from "react-admin";
import { IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const ToggleFeaturedField = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleToggle = () => {
        const updatedFeatured = !record?.featured;

        dataProvider
            .update('static-data/technologies', { id: record?.id, data: { featured: updatedFeatured } })
            .then(() => {
                notify('Featured status updated', { type: 'success' });
                refresh();
            })
            .catch(error => {
                notify(`Error: ${error.message}`, { type: 'warning' });
            });
    };

    return (
        <IconButton onClick={handleToggle}>
            {record?.featured ? <CheckIcon /> : <ClearIcon />}
        </IconButton>
    );
};