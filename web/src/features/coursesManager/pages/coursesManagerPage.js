import { Box, Grid, List, ListItem } from "@mui/material";
import SearchField from "../components/searchField";
import SideMenu from "../components/sideMenu";

function CoursesManagerPage() {
  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          <SideMenu />
        </Grid>
        <Grid item xs={10}>
          <Box>
            <List>
              <ListItem sx={{ padding: "0px 0px" }}>
                <SearchField />
              </ListItem>
              <ListItem>
                <h3>Data</h3>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CoursesManagerPage;
