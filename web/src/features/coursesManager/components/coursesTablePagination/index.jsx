import { TablePagination } from "@mui/material";
import styles from "./coursesTablePagination.module.scss";

function CoursesTablePagination({
  rowCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10]}
      component="div"
      count={rowCount}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={(e) => {handleChangeRowsPerPage(e.target.value)}}
    />
  );
}

export default CoursesTablePagination;
