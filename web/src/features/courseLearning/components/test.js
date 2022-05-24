import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Item One" {...a11yProps(3)} />
                    <Tab label="Item Two" {...a11yProps(4)} />
                    <Tab label="Item Three" {...a11yProps(5)} />
                    <Tab label="Item Three" {...a11yProps(6)} />
                    <Tab label="Item One" {...a11yProps(7)} />
                    <Tab label="Item Two" {...a11yProps(8)} />
                    <Tab label="Item Three" {...a11yProps(9)} />
                    <Tab label="Item One" {...a11yProps(10)} />
                    <Tab label="Item Two" {...a11yProps(11)} />
                    <Tab label="Item Three" {...a11yProps(12)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                1
            </TabPanel>
            <TabPanel value={value} index={1}>
                2
            </TabPanel>
            <TabPanel value={value} index={2}>
                3
            </TabPanel>
            <TabPanel value={value} index={3}>
                4
            </TabPanel>
            <TabPanel value={value} index={4}>
                5
            </TabPanel>
            <TabPanel value={value} index={5}>
                6
            </TabPanel>
            <TabPanel value={value} index={6}>
                7
            </TabPanel>
            <TabPanel value={value} index={7}>
                8
            </TabPanel>
            <TabPanel value={value} index={8}>
                9
            </TabPanel>
            <TabPanel value={value} index={9}>
                10
            </TabPanel>
            <TabPanel value={value} index={10}>
                11
            </TabPanel>
            <TabPanel value={value} index={11}>
               12
            </TabPanel>
            <TabPanel value={value} index={12}>
               13
            </TabPanel>
        </Box>
    );
}
