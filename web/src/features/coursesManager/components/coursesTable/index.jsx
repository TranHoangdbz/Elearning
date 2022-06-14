import { Paper } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../coursesManagerSlice";
import CoursesTableContainer from "./coursesTableContainer";
import CoursesTablePagination from "./coursesTablePagination";
import EnhancedTableToolBar from "./enhancedTableToolbar";
import styles from "./coursesTable.module.scss";

function CoursesTable() {
  const dispatch = useDispatch();

  const rowData = useSelector(state => state.coursesManager.courses)
  
  React.useEffect(() => {
    dispatch(getCourses());
  }, [dispatch])

  const [page, setPage] = React.useState(0);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper className={`${styles.coursestable}`} elevation={3}>
      <EnhancedTableToolBar/>
      <CoursesTableContainer
        rowData={rowData}
        page={page}
        rowsPerPage={10}
      />
      <CoursesTablePagination
        rowCount={rowData.length}
        page={page}
        rowsPerPage={10}
        handleChangePage={handleChangePage}
      />
    </Paper>
  );
}

export default CoursesTable;
