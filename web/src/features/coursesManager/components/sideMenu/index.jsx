import { Dashboard, PlayLesson } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styles from "./sideMenu.module.scss";

const menuItem = [
  {
    icon: <Dashboard className={`${styles.menuItemIcon}`} />,
    label: "Dash board",
  },
  {
    icon: <PlayLesson className={`${styles.menuItemIcon}`} />,
    label: "Course manager",
  },
];

function SideMenu() {
  return (
    <Box className={`${styles.sideMenu}`}>
      <List component="nav">
        <ListItem className={`${styles.menuHeader}`}>
          <ListItemText primary="ProCourses"></ListItemText>
        </ListItem>
        <Divider />
        {menuItem.map((item) => (
          <ListItemButton key={item.label}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default SideMenu;
