import { Card, CardContent } from '@mui/material';
import { Datagrid, EmailField, FilterList, FilterListItem, ImageField, List, Show, SimpleShowLayout, TextField, UrlField } from 'react-admin';

export const EditorList = () => (
    <List  filterDefaultValues={{accountType: "EDITOR"}}>
        <Datagrid >
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="name" />
            <TextField source="surname" />
            <TextField source="description" />
        </Datagrid>
    </List>
);
