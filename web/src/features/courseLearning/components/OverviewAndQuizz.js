import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Overview from './Overview';
import Quizz from './Quizz';

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

export default function OverviewAndQuizz(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '50%', fontSize: '15px', marginLeft:'16px', marginTop:'16px' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ fontSize: '16px', fontWeight: '700', color: '#777777' }} label="Overview" {...a11yProps(0)} />
                    <Tab sx={{ fontSize: '16px', fontWeight: '700', color: '#777777' }} label="Quizz" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Overview></Overview>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Quizz lesson={props.lesson} lessonSelect={props.lessonSelect}></Quizz>
            </TabPanel>

        </Box>
    );
}
