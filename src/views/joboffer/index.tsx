import { ArrayField, BooleanField, ChipField, Datagrid, DateField, FilterList, FilterListItem, FilterLiveSearch, List, NumberField, RichTextField, Show, SimpleShowLayout, TextField } from "react-admin";
import { ClearCacheButton } from "./components/ClearCacheButton";
import { RecalculateJobOffersPopularityRateButton } from "./components/RecalculateJobOffersPopularityRateButton";
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/LocalOffer';

const JobOfferSidebar = () => (
  <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
      <CardContent>
          <FilterLiveSearch source='search'/>
          <FilterLiveSearch source="address.city" label="City"/>
          <FilterLiveSearch source="address.postCode" label="Post code"/>
          <FilterList label="Archived" icon={<CategoryIcon />}>
                <FilterListItem label={"True"} value={{ archived: true }} />
                <FilterListItem label={"False"} value={{ archived: false }} />
            </FilterList>
          <FilterList label="Form of Employment" icon={<WorkIcon/>}>
            <FilterListItem label={"Full time"} value={{formOfEmployments: "FULL_TIME"}}/>
            <FilterListItem label={"Part time"} value={{ formOfEmployments: "PART_TIME"}} />
                    <FilterListItem label={"Contract"} value={{ formOfEmployments: "CONTRACT" }} />
                    <FilterListItem label={"Freelance"} value={{ formOfEmployments: "FREELANCE"}} />
                    <FilterListItem label={"Internship"} value={{ formOfEmployments: "INTERNSHIP" }} />
                    <FilterListItem label={"Apprenticeship"} value={{ formOfEmployments: "APPRENTICESHIP"}} />
                    <FilterListItem label={"Volunteer"} value={{ formOfEmployments: "VOLUNTEER"}} />
                    <FilterListItem label={"Per Diem"} value={{ formOfEmployments: "PER_DIEM"}} />
                    <FilterListItem label={"Temporary"} value={{ formOfEmployments: "TEMPORARY" }} />
                    <FilterListItem label={"Other"} value={{ formOfEmployments: "OTHER",}} />
          </FilterList>
      </CardContent>
  </Card>
)

export const JobOfferList = () => (
  <List aside={<JobOfferSidebar/>}>
    <RecalculateJobOffersPopularityRateButton />
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

export const JobOfferShow = () => {
   return (
    <Show>
    <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="slug" />
        <TextField source="name" />
        <TextField source="user.fullName" label="User Full Name" />
        <TextField source="user.activeJobPosition" label="Active Job Position" />
        <RichTextField source="description" />
        <TextField source="workTypes"/>
        <TextField source="experience" />
        <TextField source="formOfEmployment" />
        <TextField source="technologies"/>
        <TextField source="numberOfApplications" />
        <TextField source="salaryRange.downRange" label="Salary From" />
        <TextField source="salaryRange.upRange" label="Salary To" />
        <TextField source="salaryRange.currency" label="Currency" />
        <TextField source="salaryRange.type" label="Salary Type" />
        <DateField source="createdAt" label="Created At" />
        <DateField source="validTo" label="Valid Until" />
    </SimpleShowLayout>
</Show>
  );
};