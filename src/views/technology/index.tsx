import { BooleanField, Datagrid, List, TextField } from "react-admin";

export const TechnologyList = () => (
  <List pagination= {false}>
    <Datagrid>
      <TextField source="name"/>
      <BooleanField source="featured"/>
    </Datagrid>
  </List>
)