import { BooleanField, Datagrid, List, NumberField, TextField } from "react-admin";
import { ClearCacheButton } from "./components/ClearCacheButton";

export const JobOfferList = () => (
  <List>
    <ClearCacheButton/>
    <Datagrid rowClick="show">
      <TextField source="id"/>
      <TextField source="name"/>
      <TextField source="slug"/>
      <TextField source="shortDescription"/>
      <TextField source="user.id"/>
      <TextField source="user.fullName"/>
      <NumberField source="numberOfApplications"/>
      <BooleanField source="archived"/>
    </Datagrid>
  </List>
)