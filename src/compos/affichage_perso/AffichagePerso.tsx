import {Box, Tab, Tabs} from '@mui/material';
import {useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import PublicIcon from '@mui/icons-material/Public';
import Comps from "./Comps";
import AffichageViceVertu from "./AffichageViceVertu";
import DonneesPerso from "./DonneesPerso";
import RelationsPnjs from "./RelationsPnjs";
import InfosMonde from "../InfosMonde";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function AffichagePerso() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" variant="scrollable" scrollButtons="auto">
                    <Tab  icon={<PersonIcon />} {...a11yProps(0)} sx={{ width: 40, minWidth: 40 }} />
                    <Tab icon={<PeopleIcon />} {...a11yProps(1)} sx={{ width: 40, minWidth: 40 }} />
                    <Tab icon={<FavoriteIcon />} {...a11yProps(2)} sx={{ width: 40, minWidth: 40 }} />
                    <Tab icon={<StarIcon />} {...a11yProps(3)} sx={{ width: 40, minWidth: 40 }} />
                    <Tab icon={<PublicIcon />} {...a11yProps(4)} sx={{ width: 40, minWidth: 40 }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DonneesPerso />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RelationsPnjs />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AffichageViceVertu />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Comps />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <InfosMonde/>
            </TabPanel>
        </Box>
    );
}
