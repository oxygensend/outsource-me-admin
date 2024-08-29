import { BooleanField, BooleanInput, Create, Datagrid, DeleteButton, List, SimpleForm, TextField, TextInput } from "react-admin";
import { ToggleFeaturedField } from "./components/ToggleFeaturedField";
import SendIcon from '@mui/icons-material/Send';
import { MailButton } from "../user/components/MailButton";


export const TechnologyList = () => (
  <List pagination= {false}>
    <Datagrid>
      <TextField source="name"/>
      <ToggleFeaturedField source="featured"/>
      <MailButton/>
    </Datagrid>
  </List>
)

export const TechnologyCreate = () => (
  <Create>
      <SimpleForm>
          <TextInput source="name" />
          <BooleanInput source="featured" />
      </SimpleForm>
  </Create>
);