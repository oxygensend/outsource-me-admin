import { Card, CardContent } from '@mui/material';
import { Create, Datagrid, DeleteButton, EmailField, FilterList, FilterListItem, ImageField, List, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, UrlField } from 'react-admin';

export const AdminList = () => (
    <List  filterDefaultValues={{accountType: "ADMIN"}}>
        <Datagrid >
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="name" />
            <TextField source="surname" />
            <TextField source="phoneNumber" />
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const AdminCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="surname" />
            <TextInput source="email" />
            <TextInput source="phoneNumber" />
            <TextInput source="password" type="password" />
            <TextInput source="accountType" defaultValue="ADMIN" /> 
        </SimpleForm>
    </Create>
);