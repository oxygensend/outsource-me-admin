import { Admin, ListGuesser, Menu, MenuItemLink, Resource, ShowGuesser } from 'react-admin';
import { Layout } from './Layout';
import { authProvider } from './utils/authProvider';
import { List, Datagrid, TextField } from 'react-admin';
import dataProvider from './utils/dataProvider';
import { AddressList } from './views/address';
import { UserList, UserShow } from './views/user';
import { JobOfferList, JobOfferShow } from './views/joboffer';
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
import Person4Icon from '@mui/icons-material/Person4';
import { NotificationList } from './views/notifications';

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
        <Resource name='users' icon={PeopleIcon} list={UserList} show={UserShow} options={{ label: 'Users' }} />
        <Resource name='job-offers' icon={WorkIcon} list={JobOfferList} show={JobOfferShow} options={{ label: 'Job Offers' }} />

        <Resource name='notifications' icon={NotificationsIcon} list={NotificationList} />

        <Resource name='editor' list={EditorList} icon={EditorIcon} options={{ label: 'Editor' }} create={EditorCreate} />
        <Resource name='admin' list={AdminList} icon={AdminIcon} options={{ label: 'Admin' }} create={AdminCreate} />

        <Resource name='static-data/form-of-employments' icon={StaticDataIcon} list={EnumList} options={{ label: 'Form of employments' }} />
        <Resource name='static-data/work-types' icon={StaticDataIcon} list={EnumList} options={{ label: 'Work types' }} />

        <Resource name='static-data/technologies/details' icon={StaticDataIcon} list={TechnologyList} options={{ label: 'Technologies' }}  create={TechnologyCreate}/>

        <Resource name='static-data/addresses/with-postal-codes' icon={StaticDataIcon} list={AddressList} options={{ label: 'Addresses' }} />
        <Resource name='static-data/about-us/all' icon={StaticDataIcon} list={ListGuesser} options={{ label: 'About Us' }} />
    </Admin>
);
