import { Card, CardContent } from '@mui/material';
import { Datagrid, EmailField, FilterList, FilterListItem, ImageField, List, Show, SimpleShowLayout, TextField, UrlField } from 'react-admin';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import WorkIcon from '@mui/icons-material/Work';

const UserSidebar = () => (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
        <CardContent>
            <FilterList label="Account Type" icon={<CategoryIcon />}>
                <FilterListItem label={"Developer"} value={{ accountType: 'DEVELOPER' }} />
                <FilterListItem label={"Principle"} value={{ accountType: 'PRINCIPLE' }} />
            </FilterList>
            <FilterList label={"Looking for a job"} icon={<WorkIcon />} >
                <FilterListItem label={"Yes"} value={{ lookingForJob: true }} />
                <FilterListItem label={"No"} value={{ lookingForJob: false }} />
            </FilterList>
        </CardContent>
    </Card>
)


export const UserList = () => (
    <List aside={<UserSidebar />}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <ImageField source="imagePath" title="id" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} />
            <EmailField source="email" />
            <TextField source="name" />
            <TextField source="surname" />
            <TextField source="accountType" />
        </Datagrid>
    </List>
);

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <ImageField source="imagePath" title="id" />
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="surname" />
            <TextField source="fullName" />
            <EmailField source="email" />
            <TextField source="phoneNumber" />
            <TextField source="description" />
            <UrlField source="linkedinUrl" />
            <UrlField source="githubUrl" />
            <TextField source="dateOfBirth" />
            <TextField source="accountType" />
            <TextField source="activeJobPosition" />
            <TextField source="experience" />
            <TextField source="opinionsRate" />
            <TextField source="opinionsCount" />
        </SimpleShowLayout>
    </Show>

)