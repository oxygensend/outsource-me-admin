import { Datagrid, FilterList, FilterListItem, FilterLiveSearch, List, Show, TextField, useRecordContext } from "react-admin"
import { json } from "stream/consumers";
import { Tooltip, Card, CardContent } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const TruncatedTextField = ({source}) => {
    const record = useRecordContext();
    const content = record[source];
    const truncatedContent = content && content.length > 150 ? content.substring(0, 150) + '...' : content;
    return (
        <Tooltip title={content || ''} arrow>
            <span>{truncatedContent}</span>
        </Tooltip>
    );};

const NotificationSidebar = () => (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 400 }}>
        <CardContent>
            <FilterLiveSearch source='search'/>
            <FilterLiveSearch source="recipient_id" label="Recipient Id"/>
            <FilterLiveSearch source="recipient" label="Recipient"/>
            <FilterLiveSearch source="service_id" label="Service Id"/>
            <FilterLiveSearch source="request_id" label="Request Id"/>
            <FilterList label={"Channel"} icon={<LocalPhoneIcon/>} >
                <FilterListItem label={"Email"} value={{ channel: "EMAIL" }} />
                <FilterListItem label={"Sms"} value={{ channel: "SMS" }} />
                <FilterListItem label={"Whatsapp"} value={{ channel: "WHATSAPP" }} />
                <FilterListItem label={"Internal"} value={{ channel: "INTERNAL" }} />
            </FilterList>       
        </CardContent>
    </Card>
)
    

export const NotificationList = () => (
    <List aside={<NotificationSidebar/>}>
    <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="title" />
        <TruncatedTextField source="content" />
        <TextField source="channel" />
        <TextField source="recipient" />
        <TextField source="recipientId" label="RecipientId" />
        <TextField source="requestId" label="RequestId" />
        <TextField source="serviceId" />
        <TextField source="createdAt" />
        <TextField source="sentAt" />
        <TextField source="seenAt" />
    </Datagrid>
</List>

)

export const NotificationShow = () => (
    <Show>
    <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="title" />
        <TruncatedTextField source="content" />
        <TextField source="channel" />
        <TextField source="recipient" />
        <TextField source="recipientId" label="RecipientId" />
        <TextField source="requestId" label="RequestId" />
        <TextField source="serviceId" />
        <TextField source="createdAt" />
        <TextField source="sentAt" />
        <TextField source="seenAt" />
    </Datagrid>
</Show>
)