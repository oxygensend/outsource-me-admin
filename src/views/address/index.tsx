import { Datagrid, List, NumberField, TextField, TextInput } from "react-admin"
import { LoadAddressesButton } from "./components/loadAddressesButton"
import { LoadAddressesForceStopButton } from "./components/loadAddressesForceStopButton"

const AddressFilters = [
  <TextInput label="Search" source="search" alwaysOn key={1} />,
]

export const AddressList = () => (
  <List pagination={false} filters={AddressFilters}>
    <LoadAddressesButton />
    <LoadAddressesForceStopButton/>
    <Datagrid>
      <TextField source="city" />
      <TextField source="postalCodes" />
      <NumberField source="lat" />
      <NumberField source="lon" />
    </Datagrid>
  </List>
)