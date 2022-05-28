import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const tableHeadCells = [
  {
    id: "STT",
    label: "STT",
    align: "left",
  },
  {
    id: "ID",
    label: "ID",
    align: "left",
  },
  {
    id: "Khóa học",
    label: "Khóa học",
    align: "left",
  },
  {
    id: "Số bài học",
    label: "Số bài học",
    align: "left",
  },
  {
    id: "Số người tham gia",
    label: "Số người tham gia",
    align: "left",
  },
  {
    id: "Đã hoàn thành",
    label: "Đã hoàn thành",
    align: "right",
  },
];

function CoursesTableContainer({
  rowData,
  page,
  rowsPerPage,
  numSelected,
  handleSelectAllClick,
  handleRowClick,
  isSelected,
}) {
  const navigate = useNavigate();
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;

  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowData.length}
                checked={rowData.length > 0 && numSelected === rowData.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {tableHeadCells.map((item) => (
              <TableCell key={item.key} align={item.align}>
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              const isItemSelected = isSelected(item.courseCode);

              return (
                <TableRow
                  key={item.courseCode}
                  hover
                  onClick={() => {
                    navigate("/coursesmanager/coursedetail/" + item._id);
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(e) => handleRowClick(e, item.id)}
                    />
                  </TableCell>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{item.courseCode}</TableCell>
                  <TableCell
                    key={item.courseCode}
                    component="th"
                    scope="row"
                    sx={{ width: "500px" }}
                  >
                    {item.courseName}
                  </TableCell>
                  <TableCell>{item.lessons.length}</TableCell>
                  <TableCell>{"0"}</TableCell>
                  <TableCell align="right">
                    {item.isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành"}
                  </TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 45.51 * emptyRows,
              }}
            >
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoursesTableContainer;
