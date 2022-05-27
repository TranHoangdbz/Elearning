import { Notifications, Search } from "@mui/icons-material";
import { Avatar, Box, Grid, Icon, InputBase, Paper } from "@mui/material";
import styles from "./header.module.scss";

function Header() {
  return (
    <Paper className={`${styles.header}`} elevation={3} square>
      <Grid container>
        <Grid item xs={6}>
          <Box className={`${styles.searchField}`} component="form">
            <Icon className={`${styles.searchFieldIcon}`} fontSize="small">
              <Search />
            </Icon>
            <InputBase
              fullWidth={true}
              size="small"
              placeholder="Search for course, document, lesson,..."
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={`${styles.notiandinfo}`}>
            <Avatar
              className={`${styles.infoAvatar}`}
              sx={{ width: 32, height: 32 }}
            />
            <Icon className={`${styles.notiIcon}`}>
              <Notifications />
            </Icon>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Header;
