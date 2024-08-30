import { Datagrid, List, Show, SimpleShowLayout, TextField, TextInput } from "react-admin";

const applicationFilters = [
    <TextInput label="Applier ID" source="userId" alwaysOn />,
];

export const ApplicationList = () => (
    <List filters= {applicationFilters}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="jobOffer.id" label="Job offer ID"/>
            <TextField source="jobOffer.name"  label="Job offer"/>
            <TextField source="jobOffer.user.id" label="Job offer author ID" />
            <TextField source="jobOffer.user.fullName" label="Job offer author"/>
            <TextField source="user.id" label="Applier ID"/>
            <TextField source="user.fullName" label="Applier"/>
            <TextField source="status" />
            <TextField source="createdAt"/>
        </Datagrid>
    </List>
);

export const ApplicationShow = () => {
    return (
     <Show>
     <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="description"/>
        <TextField source="attachments"/>
        <TextField source="jobOffer.id" label="Job offer ID"/>
        <TextField source="jobOffer.name"  label="Job offer"/>
        <TextField source="jobOffer.user.id" label="Job offer author ID" />
        <TextField source="jobOffer.user.fullName" label="Job offer author"/>
        <TextField source="user.id" label="Applier ID"/>
        <TextField source="user.fullName" label="Applier"/>
        <TextField source="status" />
        <TextField source="createdAt"/>
     </SimpleShowLayout>
 </Show>
   );
 };