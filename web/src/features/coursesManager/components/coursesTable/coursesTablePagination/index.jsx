import { TablePagination } from "@mui/material";

function CoursesTablePagination({
  rowCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  return (
    <TablePagination
      rowsPerPageOptions={[10]}
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
