import { Admin, ListGuesser, Menu, MenuItemLink, Resource, ShowGuesser } from 'react-admin';
import { Layout } from './Layout';
import { authProvider } from './utils/authProvider';
import { List, Datagrid, TextField } from 'react-admin';
import dataProvider from './utils/dataProvider';
import { AddressList } from './views/address';
import { UserList, UserShow } from './views/user';
import { JobOfferList } from './views/joboffer';
import { TechnologyList } from './views/technology';
import { EditorCreate, EditorList } from './views/editor';
import { AdminCreate, AdminList } from './views/admin';
import { TechnologyCreate } from './views/technology/index';

import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import StaticDataIcon from '@mui/icons-material/Storage';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditorIcon from '@mui/icons-material/Edit';
import AdminIcon from '@mui/icons-material/Security';

const EnumList = () => (
    <List pagination={false}>
        <Datagrid>
            <TextField source='name' />
            <TextField source='displayName' />
        </Datagrid>
    </List>
);

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name='users' list={UserList} show={UserShow} options={{ label: 'Users' }} />
        <Resource name='job-offers' list={JobOfferList} show={ShowGuesser} options={{ label: 'Job Offers' }} />
        <Resource name='static-data/form-of-employments' list={EnumList} options={{ label: 'Form of employments' }} />
        <Resource name='static-data/work-types' list={EnumList} options={{ label: 'Work types' }} />

        <Resource name='static-data/technologies/details' list={TechnologyList} options={{ label: 'Technologies' }}  create={TechnologyCreate}/>

        <Resource name='static-data/addresses/with-postal-codes' list={AddressList} options={{ label: 'Addresses' }} />
        <Resource name='static-data/about-us/all' list={ListGuesser} options={{ label: 'About Us' }} />

        <Resource name='notifications' list={ListGuesser} />

        <Resource name='editor' list={EditorList} options={{ label: 'Editor' }} create={EditorCreate} />
        <Resource name='admin' list={AdminList} options={{ label: 'Admin' }} create={AdminCreate} />
    </Admin>
);
