import { Box, Grid, List, ListItem } from "@mui/material";
import CoursesTable from "../components/coursesTable";
import Header from "../components/header";
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
                <Header />
              </ListItem>
              <ListItem>
                <CoursesTable />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CoursesManagerPage;
