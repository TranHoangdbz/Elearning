import { Box, Grid, List, ListItem } from "@mui/material";
import CourseDetail from "../components/courseDetail";
import CoursesTable from "../components/coursesTable";
import Header from "../components/header";
import LessonDetail from "../components/lessonDetail";
import SideMenu from "../components/sideMenu";

function CoursesManagerPage({ route }) {
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
                {route === "courseslist" ? <CoursesTable /> : null}
                {route === "coursedetail" ? <CourseDetail /> : null}
                {route === "lessondetail" ? <LessonDetail /> : null}
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CoursesManagerPage;
